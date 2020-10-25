export const simpleListPattern = /^([\s\s]*)[\*-]\s(.+)/;

/**
 * check whether input is list
 * @param {string} input string
 * @return {boolean} whether input is list
 */
export const isList = (input: string): boolean => {
  return simpleListPattern.test(input);
};
