import { includes, map } from "lodash";
import RaceButton from "./RaceButton";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRaceTypes,
  getSelectedRaceTypes,
  toggleRaceType,
} from "../tourPlaylistSlice.ts";

export function RacePicker() {
  const allRaces = useSelector(getAllRaceTypes);
  const races = useSelector(getSelectedRaceTypes);
  const dispatch = useDispatch();
  return (
    <div className="my-3">
      {map(allRaces, (race) => (
        <RaceButton
          key={race}
          raceType={race}
          className={clsx({ "bg-gray-500": !includes(races, race) })}
          onClick={() => dispatch(toggleRaceType(race))}
        />
      ))}
    </div>
  );
}
