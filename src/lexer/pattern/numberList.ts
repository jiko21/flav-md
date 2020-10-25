export const numberListPattern = /^([\s\s]*)\d+\.\s(.+)/;

/**
 * check whether input is number list
 * @param {string} input string
 * @return {boolean} whether input is list
 */
export const isNumberList = (input: string): boolean => {
  return numberListPattern.test(input);
};
