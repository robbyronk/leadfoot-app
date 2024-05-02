import { calculateNaturalFrequency, calculateSpringFactor } from "./calculator";

describe("calculateNaturalFrequency", () => {
  it("returns correct natural frequency for valid inputs", () => {
    const result = calculateNaturalFrequency(10, 2);
    expect(result).toBeCloseTo(0.3559);
  });

  it("returns correct natural frequency for more valid inputs", () => {
    const result = calculateNaturalFrequency(66000, 500);
    expect(result).toBeCloseTo(1.8286);
  });

  it("returns 0 when spring constant is 0", () => {
    const result = calculateNaturalFrequency(0, 2);
    expect(result).toBe(0);
  });

  it("should calculate spring factor correctly", () => {
    const result = calculateSpringFactor(0.3559, 2);
    expect(result).toBeCloseTo(10);
  });

  it("should calculate spring factor correctly again", () => {
    const result = calculateSpringFactor(1.8286, 500);
    expect(result).toBeCloseTo(66000, -2);
  });
});
