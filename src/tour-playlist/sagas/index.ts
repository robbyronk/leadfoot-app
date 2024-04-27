// @ts-expect-error - Papa.parse is not typed
import Papa from "papaparse";
import { cps, delay, fork, put } from "redux-saga/effects";
import { ITour } from "../types.ts";
import { setTours, updateSecondsUntil } from "../tourPlaylistSlice.ts";
import { filter } from "lodash";
import { getSecondsUntil } from "../time.ts";

// @ts-expect-error - Papa.parse is not typed
function papaWrapper(cb) {
  Papa.parse("/tour-schedule.csv", {
    download: true,
    // @ts-expect-error - Papa.parse is not typed
    complete: (results) => {
      cb(null, results.data);
    },
    // @ts-expect-error - Papa.parse is not typed
    error: (err) => {
      cb(err, null);
    },
  });
}

function* fetchTourPlaylist() {
  const results: string[][] = yield cps(papaWrapper);
  const tours: ITour[] = filter(results, 0).map((row) => {
    return {
      time: row[0],
      cls: row[1],
      pi: parseInt(row[2]),
      theme: row[3],
      type: row[4],
      tracks: row.slice(5),
      secondsUntil: getSecondsUntil(row[0], new Date()),
    };
  });
  yield put(setTours(tours));
}

function* updateTime() {
  while (true) {
    yield put(updateSecondsUntil(new Date().toISOString()));
    yield delay(1000);
  }
}

export default function* tourPlaylistSaga() {
  yield fork(fetchTourPlaylist);
  yield fork(updateTime);
}
