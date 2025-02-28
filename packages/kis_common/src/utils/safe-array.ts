import { isNil } from 'ramda';

export const safeArray = (values: any) =>
  isNil(values) ? [] : Array.isArray(values) ? values : [values];
