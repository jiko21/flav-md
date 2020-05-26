import { _splitString } from '../../src/util/string-util';

describe('_splitString', () => {
  it('should correctly split string', () => {
    const input = `hoge
a
n`;
    const actual = _splitString(input);
    const expected = ['hoge', 'a', 'n'];
    expect(actual).toEqual(expected);
  });
});
