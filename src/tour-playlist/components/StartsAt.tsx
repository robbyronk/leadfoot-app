import { split } from "lodash";
import {
  getSecondsUntil,
  padTime,
  tourQueueTime,
  wrapHours,
  wrapMinSecs,
} from "../time.ts";

interface StartsAtPropTypes {
  tourTime: string;
}

const getLocalTime = (tourTime: string) => {
  const now = new Date();
  const [tourHourStr, tourMinuteStr] = split(tourTime, ":");
  const tourHour = parseInt(tourHourStr);
  const tourMinute = parseInt(tourMinuteStr);
  const timezoneOffset = now.getTimezoneOffset();
  const localHour = tourHour - Math.floor(timezoneOffset / 60);
  const localMinute = tourMinute - (timezoneOffset % 60);
  return `${padTime(wrapHours(localHour))}:${padTime(wrapMinSecs(localMinute))}`;
};

export function StartsAt({ tourTime }: StartsAtPropTypes) {
  const seconds = getSecondsUntil(tourTime, new Date());
  const time = getLocalTime(tourTime);
  if (seconds > tourQueueTime * 2 || seconds < 0) {
    return <div className="text-gray-400 mt-0">Starts at {time}</div>;
  }
  return null;
}
