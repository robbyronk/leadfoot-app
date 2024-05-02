import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import {
  calculateNaturalFrequency,
  calculateSpringFactor,
  frontMass,
} from "./calculator.ts";

interface SuspensionCalculatorState {
  units: "kgf" | "nm" | "lbf";
  mass: number;
  frontDistribution: number;
  minimumFrontSpringRate: number;
  targetFrequency: number;
  frontRatio: number;
}

const initialState: SuspensionCalculatorState = {
  units: "kgf",
  mass: 2000,
  frontDistribution: 50,
  minimumFrontSpringRate: 0,
  targetFrequency: 2,
  frontRatio: 10,
};

const suspensionCalculatorSlice = createSlice({
  name: "suspensionCalculator",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.units = action.payload.units;
      state.mass = action.payload.mass;
      state.minimumFrontSpringRate = action.payload.minimumFrontSpringRate;
      state.targetFrequency = action.payload.targetFrequency;
      state.frontRatio = action.payload.frontRatio;
      state.frontDistribution = action.payload.frontDistribution;
    },
  },
});

const thisSlice = (state: RootState) => state[suspensionCalculatorSlice.name];

export interface SuspensionOutputs {
  frontSuspension: number;
  rearSuspension: number;
  frontFrequency: number;
  rearFrequency: number;
}

export const getUnits = createSelector(thisSlice, (state) => state.units);

export const getSuspensionSettings = createSelector(thisSlice, (state) => {
  const fMass = frontMass(state.mass, state.frontDistribution);
  const rMass = state.mass - fMass;
  const frontSuspension = calculateSpringFactor(
    state.targetFrequency,
    fMass / 2,
  );
  if (frontSuspension < state.minimumFrontSpringRate) {
    const frontFrequency = calculateNaturalFrequency(
      state.minimumFrontSpringRate,
      fMass / 2,
    );
    const rearFrequency =
      frontFrequency + frontFrequency * (state.frontRatio / 100);
    return {
      frontSuspension: state.minimumFrontSpringRate,
      rearSuspension: calculateSpringFactor(rearFrequency, rMass / 2),
      frontFrequency,
      rearFrequency,
    };
  }
  const rearFrequency =
    state.targetFrequency + state.targetFrequency * (state.frontRatio / 100);
  const rearSuspension = calculateSpringFactor(rearFrequency, rMass / 2);
  return {
    frontSuspension,
    rearSuspension,
    frontFrequency: state.targetFrequency,
    rearFrequency,
  };
});

export const { setValues } = suspensionCalculatorSlice.actions;

export default suspensionCalculatorSlice.reducer;
