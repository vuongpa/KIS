import { describe, expect, test } from '@jest/globals';

import { formatTwoDigits } from './format-two-digits';

describe('formatTwoDigits', () => {
  test('< 10', () => {
    expect(formatTwoDigits(1)).toBe('01');
    expect(formatTwoDigits(5)).toBe('05');
    expect(formatTwoDigits(9)).toBe('09');
  });

  test('>= 10', () => {
    expect(formatTwoDigits(10)).toBe('10');
    expect(formatTwoDigits(15)).toBe('15');
    expect(formatTwoDigits(19)).toBe('19');
  });
});
