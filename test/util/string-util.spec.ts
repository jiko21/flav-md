import { _splitString, _escapeCodeString } from '../../src/util/string-util';

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

describe('_escapeCodeString', () => {
  it('should correctly escape &', () => {
    const input = `true && false`;
    const expected = `true &amp;&amp; false`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly escape <', () => {
    const input = `<script`;
    const expected = `&lt;script`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly escape >', () => {
    const input = `script>`;
    const expected = `script&gt;`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly escape >', () => {
    const input = `"aaa"`;
    const expected = `&quot;aaa&quot;`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly escape >', () => {
    const input = `'aaa'`;
    const expected = `&#39;aaa&#39;`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly escape whole script tag', () => {
    const input = `<script src="/a/b.js">alert('aaa')</script>`;
    const expected = `&lt;script src=&quot;/a/b.js&quot;&gt;alert(&#39;aaa&#39;)&lt;/script&gt;`;
    const actual = _escapeCodeString(input);
    expect(actual).toEqual(expected);
  });
});
