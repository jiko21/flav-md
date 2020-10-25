import { _escapeCodeString } from '../../util/string-util';

const codeBlockParenPattern = /^```$/;

/**
 * test line is code block paren
 * @param {string} input string
 * @return {boolean} result
 */
export const isCodeBlockStart = (input: string): boolean => {
  return codeBlockParenPattern.test(input);
};

/**
 * escape string list
 * @param {string[]} input texts
 * @return {string[]} escaped string[]
 */
export const paseCodeBlock = (input: string[]): string[] => {
  return input.map((item) => _escapeCodeString(item));
};
