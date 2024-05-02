import { useSelector } from "react-redux";
import {
  getSuspensionSettings,
  getUnits,
  SuspensionOutputs,
} from "../suspensionCalculatorSlice.ts";
import {
  convertNewtonMetersToKgfPerCm,
  convertNewtonMetersToPoundForcePerInch,
} from "../calculator.ts";
import { round } from "lodash";
import UnitDisplay from "./UnitDisplay.tsx";

export function Results() {
  const results: SuspensionOutputs = useSelector(getSuspensionSettings);
  console.log(results);
  const units = useSelector(getUnits);
  console.log(units);
  const unitConvert = (value: number) => {
    switch (units) {
      case "kgf":
        return convertNewtonMetersToKgfPerCm(value);
      case "lbf":
        return convertNewtonMetersToPoundForcePerInch(value);
      case "nm":
        return value;
    }
  };
  return (
    <div>
      <h2>Results</h2>
      <div>
        <h3>Front Suspension</h3>
        <p>
          <span className={"mr-1"}>
            {round(unitConvert(results.frontSuspension)).toFixed(1)}
          </span>
          <UnitDisplay />
          <span className={"ml-2"}>
            ({results.frontFrequency.toFixed(2)}Hz)
          </span>
        </p>
      </div>
      <div>
        <h3>Rear Suspension</h3>
        <p>
          <span className={"mr-1"}>
            {round(unitConvert(results.rearSuspension)).toFixed(1)}
          </span>
          <UnitDisplay />
          <span className={"ml-2"}>({results.rearFrequency.toFixed(2)}Hz)</span>
        </p>
      </div>
    </div>
  );
}
