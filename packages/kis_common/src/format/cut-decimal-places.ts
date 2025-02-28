export function cutDecimalPlaces(val: number, decimalPlaces = 2) {
  const factor = 10 ** decimalPlaces;
  return parseInt((val * factor).toString()) / factor;
}
