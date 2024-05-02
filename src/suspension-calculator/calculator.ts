export function calculateNaturalFrequency(k: number, m: number): number {
  return (1 / (2 * Math.PI)) * Math.sqrt(k / m);
}

export function calculateSpringFactor(f: number, m: number): number {
  return Math.pow(2 * Math.PI * f, 2) * m;
}

export function frontMass(mass: number, distribution: number): number {
  return mass * (distribution / 100);
}

export function convertlbFperInToNm(poundForcePerInch: number): number {
  const conversionFactor = 0.112984829;
  return poundForcePerInch * conversionFactor;
}

export function convertNewtonMetersToKgfPerCm(newtonMeters: number): number {
  const conversionFactor = 9.806 * 100;
  return newtonMeters / conversionFactor;
}

export const convertKgfPerCmToNewtonMeters = (kgfPerCm: number): number => {
  const conversionFactor = 9.806 * 100;
  return kgfPerCm * conversionFactor;
};

export function convertNewtonMetersToPoundForcePerInch(
  newtonMeters: number,
): number {
  const conversionFactor = 175.126;
  return newtonMeters / conversionFactor;
}

export function convertPoundsToKg(pounds: number): number {
  const conversionFactor = 2.20462;
  return pounds / conversionFactor;
}
