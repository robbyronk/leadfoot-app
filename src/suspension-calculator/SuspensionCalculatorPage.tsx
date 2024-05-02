import CalculatorForm from "./components/CalculatorForm.tsx";
import { Results } from "./components/Results.tsx";

export default function SuspensionCalculatorPage() {
  return (
    <div className={"grid grid-cols-2"}>
      <CalculatorForm />
      <Results />
    </div>
  );
}
