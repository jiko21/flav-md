import { encloseQuote, isQuoteBlock } from '../../../src/lexer/pattern/quote';

describe('quote', () => {
  it('should return true when input is block', () => {
    const text = `> hogehoge`;
    expect(isQuoteBlock(text)).toBe(true);
  });

  it('should return false when input is not block', () => {
    const text = `hogehoge`;
    expect(isQuoteBlock(text)).toBe(false);
  });
});

describe('encloseQuote', () => {
  it('should correctly parse block', () => {
    const text = ['> hogehoge', '> this is test', 'aaa'];
    const expected = ['hogehoge', 'this is test', 'aaa'];
    expect(encloseQuote(text)).toEqual(expected);
  });
});
