export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  } else if (typeof value === 'number') {
    return value !== 0;
  } else {
    return Boolean(value);
  }
}
