import { ElementNode } from '../lexer';
import { inlineParse } from './inline';
import { simpleListPattern } from './simpleList';

/**
 * parse list to ElementNode
 * @param {string} input input lists
 * @param {RegExp} pattern parse pattern
 * @param {number} nowIndent indent length
 * @return {ElementNode | ElementNode[]} results
 */
export const parseList = (input: string[], pattern: RegExp, nowIndent: number = 0): ElementNode => {
  const resultsNode: ElementNode = {
    tag: pattern === simpleListPattern ? 'ul' : 'ol',
    content: [] as ElementNode[],
  };
  for (let i = 0; i < input.length; i++) {
    const [indentLine, content] = (input[i].match(pattern) as string[]).splice(1, 2);
    const indentLength = indentLine.length;
    if (indentLength > nowIndent) {
      const startIdnex = i;
      while (true) {
        i++;
        if (i >= input.length) break;
        const _indentLength = (input[i].match(pattern) as string[])[1].length;
        if (_indentLength < indentLength) {
          break;
        }
      }

      const parseResult = parseList(input.slice(startIdnex, i), pattern, indentLength);
      (resultsNode.content as ElementNode[])[
        (resultsNode.content as ElementNode[]).length - 1
      ].children = parseResult;
      i--;
      continue;
    }

    (resultsNode.content as ElementNode[]).push({
      tag: 'li',
      content: inlineParse(content),
    });
  }
  return resultsNode;
};
