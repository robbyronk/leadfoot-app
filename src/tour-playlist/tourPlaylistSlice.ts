import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITour } from "./types.ts";
import {
  filter,
  isEmpty,
  isEqual,
  keyBy,
  sortBy,
  uniq,
  values,
  xor,
} from "lodash";
import { RootState } from "../store.ts";
import { getSecondsUntil } from "./time.ts";

interface TourPlaylistState {
  classes: string[];
  pinnedTours: string[];
  raceTypes: string[];
  tours: Record<string, ITour>;
}

const initialState: TourPlaylistState = {
  classes: [],
  pinnedTours: [],
  raceTypes: [],
  tours: {},
};

const tourPlaylistSlice = createSlice({
  name: "tourPlaylist",
  initialState,
  reducers: {
    setRaceTypes: (state, action: PayloadAction<string[]>) => {
      if (isEqual(state.raceTypes, action.payload)) {
        state.raceTypes = allRaceTypes(state.tours);
        return;
      }
      state.raceTypes = action.payload;
    },
    toggleRaceType: (state, action: PayloadAction<string>) => {
      state.raceTypes = xor(state.raceTypes, [action.payload]);
      if (isEmpty(state.raceTypes)) {
        state.raceTypes = allRaceTypes(state.tours);
      }
    },
    setClasses: (state, action: PayloadAction<string[]>) => {
      if (isEqual(state.classes, action.payload)) {
        state.classes = allClasses(state.tours);
        return;
      }
      state.classes = action.payload;
    },
    toggleClass: (state, action: PayloadAction<string>) => {
      state.classes = xor(state.classes, [action.payload]);
      if (isEmpty(state.classes)) {
        state.classes = allClasses(state.tours);
      }
    },
    togglePinTour: (state, action: PayloadAction<string>) => {
      state.pinnedTours = xor(state.pinnedTours, [action.payload]);
    },
    setTours: (state, action: PayloadAction<ITour[]>) => {
      state.tours = keyBy(action.payload, "time");
      state.classes = uniq(values(state.tours).map((tour) => tour.cls));
      state.raceTypes = uniq(values(state.tours).map((tour) => tour.type));
    },
    updateSecondsUntil: (state, action: PayloadAction<string>) => {
      values(state.tours).forEach((tour) => {
        tour.secondsUntil = getSecondsUntil(
          tour.time,
          new Date(action.payload),
        );
      });
    },
  },
});

const thisSlice = (state: RootState) => state[tourPlaylistSlice.name];

export const getSelectedClasses = createSelector(
  thisSlice,
  (state) => state.classes,
);

export const getSelectedRaceTypes = createSelector(
  thisSlice,
  (state) => state.raceTypes,
);

export const getAllTours = createSelector(thisSlice, (state) => state.tours);

const getSortedTours = createSelector(getAllTours, (tours) =>
  sortBy(tours, "secondsUntil"),
);

export const getFilteredTours = createSelector(
  getSortedTours,
  getSelectedRaceTypes,
  getSelectedClasses,
  (tours, raceTypes, classes) =>
    filter(
      tours,
      (tour) => raceTypes.includes(tour.type) && classes.includes(tour.cls),
    ),
);

const allRaceTypes = (tours: Record<string, ITour>): string[] =>
  uniq(values(tours).map((tour: ITour) => tour.type));

export const getAllRaceTypes = createSelector(getAllTours, allRaceTypes);

const allClasses = (tours: Record<string, ITour>): string[] =>
  uniq(values(tours).map((tour: ITour) => tour.cls));
export const getAllClasses = createSelector(getAllTours, allClasses);

export const getPinnedTours = createSelector(thisSlice, (state) =>
  filter(state.tours, ({ time }) => state.pinnedTours.includes(time)),
);

export const getIsTourPinned = (time: string) =>
  createSelector(thisSlice, (state) => state.pinnedTours.includes(time));

export const {
  updateSecondsUntil,
  toggleClass,
  toggleRaceType,
  togglePinTour,
  setRaceTypes,
  setClasses,
  setTours,
} = tourPlaylistSlice.actions;

export default tourPlaylistSlice.reducer;
