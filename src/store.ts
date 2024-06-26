import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga.ts";
import tourPlaylistSlice from "./tour-playlist/tourPlaylistSlice.ts";
import suspensionCalculatorSlice from "./suspension-calculator/suspensionCalculatorSlice.ts";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tourPlaylist: tourPlaylistSlice,
    suspensionCalculator: suspensionCalculatorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
export default store;

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
