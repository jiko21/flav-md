import { describe, it, expect, test } from 'bun:test';
import { isNumberList } from './numberList';

describe('isNumberList', () => {
  test('should return true when format is list `1.` (nest 0)', () => {
    const input = '1. aaa';
    expect(isNumberList(input)).toBe(true);
  });

  test('should return true when format is list `  2.` (nest 1)', () => {
    const input = '  2. aaa';
    expect(isNumberList(input)).toBe(true);
  });

  test('should return true when format is list `10.` (nest 0)', () => {
    const input = '10. aaa';
    expect(isNumberList(input)).toBe(true);
  });

  test('should return true when format is not list', () => {
    const input = 'aaa';
    expect(isNumberList(input)).toBe(false);
  });
});
