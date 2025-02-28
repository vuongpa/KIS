export function roundDecimalPlaces(val: number, decimalPlaces = 2) {
  const factor = 10 ** decimalPlaces;
  return Math.round(val * factor) / factor;
}
