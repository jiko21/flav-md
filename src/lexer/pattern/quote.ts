const quotePattern = /^>\s*([\s\>]*.+)/;

/**
 * check block string is quote
 * @param {string} input quote string
 * @return {boolean} result
 */
export const isQuoteBlock = (input: string): boolean => {
  return input.charAt(0) === '>';
};

/**
 * enclose quote texts
 * @param {string} input texts
 * @return {string[]} string array
 */
export const encloseQuote = (input: string[]): string[] => {
  return input.map((item) => {
    const rslt = item.match(quotePattern) as string[] | null;
    return rslt !== null ? rslt[1] : item;
  });
};
