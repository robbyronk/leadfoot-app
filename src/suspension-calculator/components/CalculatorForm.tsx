import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setValues } from "../suspensionCalculatorSlice.ts";
import {
  convertKgfPerCmToNewtonMeters,
  convertlbFperInToNm,
  convertPoundsToKg,
} from "../calculator.ts";
import { Button, Label, Select, TextInput } from "flowbite-react";

export interface FormInputs {
  units: "kgf" | "nm" | "lbf";
  mass: number;
  frontDistribution: number;
  minimumFrontSpringRate: number;
  targetFrequency: number;
  frontRatio: number;
}

export default function CalculatorForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      units: "kgf",
      mass: 2000,
      frontDistribution: 50,
      minimumFrontSpringRate: 0,
      targetFrequency: 2.0,
      frontRatio: 10,
    },
  });
  const onSubmit = (data: FormInputs) => {
    const minimumFrontSpringRate = () => {
      switch (data.units) {
        case "kgf":
          return convertKgfPerCmToNewtonMeters(data.minimumFrontSpringRate);
        case "lbf":
          return convertlbFperInToNm(data.minimumFrontSpringRate);
        case "nm":
          return data.minimumFrontSpringRate;
      }
    };
    dispatch(
      setValues({
        ...data,
        mass: data.units === "lbf" ? convertPoundsToKg(data.mass) : data.mass,
        minimumFrontSpringRate: minimumFrontSpringRate(),
      }),
    );
  };

  const [showAdvanced, setShowAdvanced] = useState(false);

  function toggleAdvanced() {
    setShowAdvanced((prev) => !prev);
  }

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Label htmlFor={"units"}>Units</Label>

          <Select id="units" {...register("units", { required: true })}>
            <option value={"kgf"}>kg and kgf/cm</option>
            <option value={"nm"}>kg and Nm</option>
            <option value={"lbf"}>lb and lbf/in</option>
          </Select>
        </div>

        <div className="mb-5">
          <Label htmlFor="mass">Total Weight</Label>
          <TextInput
            id={"mass"}
            inputMode={"numeric"}
            {...register("mass", { required: true, valueAsNumber: true })}
          />
          {errors.mass && <span>This field is required</span>}
        </div>
        <div className="mb-5">
          <Label htmlFor="frontDistribution">Front Distribution</Label>
          <TextInput
            id={"frontDistribution"}
            inputMode={"numeric"}
            {...register("frontDistribution", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.frontDistribution && <span>This field is required</span>}
        </div>
        {showAdvanced && (
          <>
            <div className="mb-5">
              <Label htmlFor="minimumFrontSpringRate">
                Minimum Front Spring Rate
              </Label>
              <TextInput
                id={"minimumFrontSpringRate"}
                inputMode={"numeric"}
                {...register("minimumFrontSpringRate", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="mb-5">
              <Label htmlFor="targetFrequency">Target Frequency</Label>
              <TextInput
                id={"targetFrequency"}
                inputMode={"numeric"}
                {...register("targetFrequency", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="mb-5">
              <Label htmlFor="frontRatio">Front/Rear Frequency Ratio</Label>
              <TextInput
                id={"frontRatio"}
                inputMode={"numeric"}
                {...register("frontRatio", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </>
        )}
        <Button
          className={"mb-2"}
          size={"xs"}
          color={"blue"}
          onClick={toggleAdvanced}
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Fields
        </Button>
        <Button color={"success"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
