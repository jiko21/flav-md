import { MdNode } from './builder';
import { isCodeBlockStart, parseCodeBlock } from './pattern/codeBlock';
import { isHr } from './pattern/hr';
import { inlineParse } from './pattern/inline';
import { parseList } from './pattern/list';
import { isNumberList, numberListPattern } from './pattern/numberList';
import { encloseQuote, isQuoteBlock } from './pattern/quote';
import { isList, simpleListPattern } from './pattern/simpleList';
import { isTableBlockStart, parseTable, Table } from './pattern/table';
export type Token =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ul'
  | 'ol'
  | 'li'
  | 'blockquote'
  | 'code'
  | 'table'
  | 'hr';

namespace Token {
  /**
   * Create a lexer.
   * @param {number} count input text
   * @return {Token} returns token value
   */
  export function valueOf(count: number): Token {
    if (count < 1 || count > 6) return 'p';
    return `h${count}` as Token;
  }
}

export type ElementNode = {
  tag: Token;
  content?: string | ElementNode | ElementNode[] | Table;
  children?: undefined | ElementNode;
};

export const _createLexer = (input: string[]): Lexer => {
  return new Lexer(input);
};

/** Class representing a lexer. */
export class Lexer {
  /**
   * Create a lexer.
   * @param {string[]} text input text
   */
  constructor(private text: string[]) {}

  /**
   * parse input text and return text
   * @return {MdNode} output value
   */
  parse(): MdNode {
    const rsltStr = this._parse(this.text);
    return new MdNode(rsltStr);
  }

  /**
   * parse input text and return ElementNode[]
   * @param {string} input input string array
   * @return {ElementNode[]} rslt
   */
  private _parse(input: string[]): ElementNode[] {
    const rsltStr = [] as ElementNode[];
    for (let i = 0; i < input.length; i++) {
      const _listIndex = i;
      if (isList(input[i])) {
        while (isList(input[i])) i++;
        if (_listIndex !== i) {
          const parseResult = parseList(input.slice(_listIndex, i), simpleListPattern);
          rsltStr.push(parseResult);
          i--;
          continue;
        }
      } else if (isNumberList(input[i])) {
        while (isNumberList(input[i])) i++;
        if (_listIndex !== i) {
          const parseResult = parseList(input.slice(_listIndex, i), numberListPattern);
          rsltStr.push(parseResult);
          i--;
          continue;
        }
      } else if (isQuoteBlock(input[i])) {
        const quoteIndex = i;
        while (input[i] !== '' && i < input.length) i++;
        const parseResult = this._parse(encloseQuote(input.slice(quoteIndex, i)));
        rsltStr.push({
          tag: 'blockquote',
          content: parseResult,
        });
        continue;
      } else if (isCodeBlockStart(input[i])) {
        const codeIndex = ++i;
        while (!isCodeBlockStart(input[i])) i++;
        // escapeさせる
        rsltStr.push({
          tag: 'code',
          content: parseCodeBlock(input.slice(codeIndex, i)).join('<br />'),
        });
        continue;
      } else if (isTableBlockStart(input[i])) {
        const [table, skip] = parseTable(input.slice(i));
        i += skip - 1;
        rsltStr.push({
          tag: 'table',
          content: table,
        });
        continue;
      } else if (isHr(input[i])) {
        rsltStr.push({
          tag: 'hr',
        });
        continue;
      } else {
        rsltStr.push(this._parseLine(input[i]));
      }
    }
    return rsltStr;
  }

  /**
   * parse each line and replace top object
   * @param {string} input input value
   * @return {ElementNode} output value
   */
  private _parseLine(input: string): ElementNode {
    let sharpCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '#') {
        sharpCount++;
        continue;
      } else if (input[i] === ' ') {
        break;
      }
    }
    return {
      tag: Token.valueOf(sharpCount),
      content: inlineParse(input.substring(sharpCount === 0 ? sharpCount : sharpCount + 1)),
    };
  }
}
