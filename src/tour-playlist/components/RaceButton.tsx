import clsx from "clsx";

interface RaceButtonPropTypes {
  raceType: string;
  className?: string;
  onClick: () => void;
}

function RaceButton({ raceType, className, onClick }: RaceButtonPropTypes) {
  return (
    <button
      onClick={onClick}
      className={clsx(className, "px-2 py-1 mr-1 font-bold rounded-none", {
        "bg-apex": raceType === "Apex",
        "bg-wilds": raceType === "Wilds",
        "bg-baja": raceType === "Baja",
      })}
    >
      {raceType}
    </button>
  );
}

export default RaceButton;
