import {
  formatSecondsToHHMMSS,
  getSecondsUntil,
  tourQueueTime,
} from "../time.ts";
import clsx from "clsx";

interface TimeLeftPropTypes {
  tourTime: string;
}

export function TimeLeft({ tourTime }: TimeLeftPropTypes) {
  const seconds = getSecondsUntil(tourTime, new Date());
  if (seconds > tourQueueTime * 2 && seconds > 0) {
    return null;
  }
  return (
    <span className={clsx({ "text-red": seconds < 60 })}>
      {formatSecondsToHHMMSS(seconds)}
    </span>
  );
}
