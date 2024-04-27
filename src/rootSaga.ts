import { call, fork } from "redux-saga/effects";
import tourPlaylistSaga from "./tour-playlist/sagas";

export default function* rootSaga() {
  yield call(console.log, "leadfoot app loaded");
  yield fork(tourPlaylistSaga);
}
