export function clearNumberFormat(
  displayVal: string,
  sectionsDelimiter = ',',
  decimalDelimiter = '.'
) {
  if (typeof displayVal == 'number') return displayVal;
  let val = displayVal.toString();
  const re = new RegExp('[' + sectionsDelimiter + ']');
  do {
    val = val.replace(re, '');
  } while (val.indexOf(sectionsDelimiter) > -1);
  val = val.replace(new RegExp('[' + decimalDelimiter + ']'), '.');
  return Number(val);
}
