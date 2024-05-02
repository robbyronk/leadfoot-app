import { useSelector } from "react-redux";
import { getUnits } from "../suspensionCalculatorSlice.ts";

export default function UnitDisplay() {
  const units = useSelector(getUnits);
  if (units === "kgf") {
    return "Kgf/cm";
  }
  if (units === "nm") {
    return "Nm";
  }
  if (units === "lbf") {
    return "lbf/in";
  }
}
