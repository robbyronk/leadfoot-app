import clsx from "clsx";
import { clsToPi } from "../consts.ts";

interface ClassButtonPropTypes {
  cls: string;
  className?: string;
  onClick: () => void;
}

function ClassButton({ cls, className, onClick }: ClassButtonPropTypes) {
  const pi = clsToPi[cls.toLowerCase()];
  return (
    <button
      onClick={onClick}
      className={clsx(
        `p-1 font-bold mr-1 flex justify-between rounded-none`,
        {
          "bg-classS2": cls === "S2",
          "bg-classS1": cls === "S1",
          "bg-classA": cls === "A",
          "bg-classB": cls === "B",
          "bg-classC": cls === "C",
          "bg-classD": cls === "D",
        },
        className,
      )}
    >
      <div>{cls}</div>
      <div className="ml-1 pi bg-white text-black px-1">{pi}</div>
    </button>
  );
}

export default ClassButton;
