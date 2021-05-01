import { isCodeBlockStart, parseCodeBlock } from '../../../src/lexer/pattern/codeBlock';
import * as stringUtil from '../../../src/util/string-util';

describe('isCodeBlockStart', () => {
  it('should return true when input is ```', () => {
    const input = '```';
    expect(isCodeBlockStart(input)).toBe(true);
  });

  it('should return true when input is ```<langname>', () => {
    const input = '```html';
    expect(isCodeBlockStart(input)).toBe(true);
  });

  it('should return true when input is ``', () => {
    const input = '``';
    expect(isCodeBlockStart(input)).toBe(false);
  });

  it('should return true when input is `', () => {
    const input = '`';
    expect(isCodeBlockStart(input)).toBe(false);
  });
});

describe('parseCodeBlock', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should correctly call _escapeCodeString for escaping javascript', () => {
    const escapeCodeStringMock = jest
      .spyOn(stringUtil, '_escapeCodeString')
      .mockImplementation((x) => x);
    const input = ['a', 'b', 'c'];
    parseCodeBlock(input);
    expect(escapeCodeStringMock).toBeCalledTimes(3);
  });

  it('should correctly parse javascript code', () => {
    const codeBlock = [`<script src="/a/b.js">alert('aaa')</script>`, `'aaa'`, `"aaa"`];
    const result = [
      `&lt;script src=&quot;/a/b.js&quot;&gt;alert(&#39;aaa&#39;)&lt;/script&gt;`,
      `&#39;aaa&#39;`,
      `&quot;aaa&quot;`,
    ];
    expect(parseCodeBlock(codeBlock)).toEqual(result);
  });
});
