import { padStart, split } from "lodash";

// todo use date-fns

export function wrapHours(hour: number) {
  if (hour < 0) {
    return hour + 24;
  }
  if (hour > 23) {
    return hour - 24;
  }
  return hour;
}

export function wrapMinSecs(minutesOrSeconds: number) {
  return minutesOrSeconds < 0 ? minutesOrSeconds + 60 : minutesOrSeconds;
}

export function padTime(time: number) {
  return padStart(`${time}`, 2, "0");
}

export function secondsFromSeconds(seconds: number) {
  return padTime(seconds % 60);
}

export function minutesFromSeconds(seconds: number) {
  return padStart(`${Math.floor(seconds / 60) % 60}`, 2, "0");
}

export function hoursFromSeconds(seconds: number) {
  return padStart(`${Math.floor(seconds / 3600)}`, 2, "0");
}

export function formatSecondsToHHMMSS(seconds: number) {
  const formatted = `${minutesFromSeconds(seconds)}:${secondsFromSeconds(seconds)}`;
  const hours = seconds > 3600 ? `${hoursFromSeconds(seconds)}:` : "";
  return hours + formatted;
}

export const tourQueueTime = 120;

export const getSecondsUntil = (tourTime: string, now: Date) => {
  const [tourHourStr, tourMinuteStr] = split(tourTime, ":");
  const tourHour = parseInt(tourHourStr);
  const tourMinute = parseInt(tourMinuteStr);
  const nowHour = now.getUTCHours();
  const nowMinute = now.getUTCMinutes();
  const nowSeconds = now.getUTCSeconds();
  const secondsUntil =
    (tourHour - nowHour) * (60 * 60) +
    (tourMinute - nowMinute) * 60 -
    nowSeconds;
  return secondsUntil < 0 ? secondsUntil + 24 * 60 * 60 : secondsUntil;
};
