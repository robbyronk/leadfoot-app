import clsx from "clsx";
import ClassButton from "./ClassButton";
import RaceButton from "./RaceButton";
import { tourQueueTime } from "../time.ts";
import { ITour } from "../types.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsTourPinned,
  setClasses,
  setRaceTypes,
  togglePinTour,
} from "../tourPlaylistSlice.ts";
import { TimeLeft } from "./TimeLeft.tsx";
import { StartsAt } from "./StartsAt.tsx";

interface TourPropTypes {
  tour: ITour;
}

export function Tour({ tour }: TourPropTypes) {
  const dispatch = useDispatch();

  const selectOnlyThisClass = () => {
    dispatch(setClasses([tour.cls]));
  };

  const selectOnlyThisRaceType = () => {
    dispatch(setRaceTypes([tour.type]));
  };

  const pinTour = () => {
    dispatch(togglePinTour(tour.time));
  };

  const isPinned = useSelector(getIsTourPinned(tour.time));

  const secondsUntil = 123;

  return (
    <div
      className={clsx("my-2 flex justify-center items-center", {
        "queue-now": secondsUntil < tourQueueTime,
        "next-up":
          secondsUntil < tourQueueTime * 2 && !(secondsUntil < tourQueueTime),
        pinned: isPinned,
      })}
    >
      <div className="grid gap-1 justify-center items-center">
        <div className="grid gap-1">
          <ClassButton cls={tour.cls} onClick={selectOnlyThisClass} />
          <RaceButton raceType={tour.type} onClick={selectOnlyThisRaceType} />
        </div>
        <div className="text-xl">{tour.theme}</div>
        <div className="col-span-2">
          <TimeLeft tourTime={tour.time} />
          <StartsAt tourTime={tour.time} />
        </div>
        <div className="tour-pin">
          <span onClick={pinTour}>{isPinned ? "unpin" : "pin"}</span>
        </div>
        <div className="text-sm">
          {tour.tracks.map((track: string) => (
            <div key={track}>{track}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
