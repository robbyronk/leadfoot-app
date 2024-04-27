import { includes, map, sortBy } from "lodash";
import ClassButton from "./ClassButton";
import clsx from "clsx";
import { clsToPi } from "../consts.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClasses,
  getSelectedClasses,
  toggleClass,
} from "../tourPlaylistSlice.ts";

export function ClassPicker() {
  const allClasses = useSelector(getAllClasses);
  const classes = useSelector(getSelectedClasses);
  const sorted = sortBy(allClasses, (cls) => clsToPi[cls.toLowerCase()]);
  const dispatch = useDispatch();
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4 my-3">
      {map(sorted, (cls) => (
        <ClassButton
          key={cls}
          cls={cls}
          className={clsx({ "bg-gray-500": !includes(classes, cls) })}
          onClick={() => dispatch(toggleClass(cls))}
        />
      ))}
    </div>
  );
}
