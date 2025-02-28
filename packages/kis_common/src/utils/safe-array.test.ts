import { safeArray } from './safe-array';

describe('safeArray', () => {
  // Test the case when the input value is null or undefined, the function should return an empty array
  test('Returns an empty array when the input value is null or undefined', () => {
    expect(safeArray(null)).toEqual([]);
    expect(safeArray(undefined)).toEqual([]);
  });

  // Test the case when the input value is an array, the function should return the same array
  test('Returns the original array when the input is an array', () => {
    const array = [1, 2, 3];
    expect(safeArray(array)).toBe(array);
  });

  // Test the case when the input value is not an array, the function should convert it into an array containing that value
  test('Converts the input value into an array if it is not an array', () => {
    const value = 'hello';
    expect(safeArray(value)).toEqual([value]);
  });

  // Test the case when the input value is an integer, the function should convert it into an array containing that number
  test('Converts an integer into an array containing that number', () => {
    const number = 42;
    expect(safeArray(number)).toEqual([number]);
  });

  // Test the case when the input value is an object, the function should convert it into an array containing that object
  test('Converts an object into an array containing that object', () => {
    const obj = { key: 'value' };
    expect(safeArray(obj)).toEqual([obj]);
  });
});
