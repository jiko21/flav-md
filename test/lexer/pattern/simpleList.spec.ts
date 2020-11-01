import { isList } from '../../../src/lexer/pattern/simpleList';

describe('isList', () => {
  test('should return true when format is list `*` (nest 0)', () => {
    const input = '* aaa';
    expect(isList(input)).toBe(true);
  });

  test('should return true when format is list `*` (nest 1)', () => {
    const input = '  * aaa';
    expect(isList(input)).toBe(true);
  });

  test('should return true when format is list `-` (nest 1)', () => {
    const input = '  - aaa';
    expect(isList(input)).toBe(true);
  });

  test('should return true when format is not list', () => {
    const input = 'aaa';
    expect(isList(input)).toBe(false);
  });
});
