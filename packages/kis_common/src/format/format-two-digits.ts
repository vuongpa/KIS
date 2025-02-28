export const formatTwoDigits = (num: number | string) =>
  Number(num) < 10 ? `0${num}` : num + '';
