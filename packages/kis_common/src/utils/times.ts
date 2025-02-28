import { AnyFunction } from '../type/any-function';

export const times = (func: AnyFunction, n: number) => {
  Array
    .from(Array(n))
    .forEach(() => {
      func();
    });
};
