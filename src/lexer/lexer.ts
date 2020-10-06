import { MdNode } from './builder';
import { _escapeCodeString } from '../util/string-util';
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
  | 'table';

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
  content: string | ElementNode | ElementNode[] | Table;
  children?: undefined | ElementNode;
};

export type Table = {
  head: TableHead[];
  body: string[][];
};

export type TableHead = {
  cell: string;
  align: Align;
};

enum Align {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * check whether arg is ElemetNode
 * @param {any} arg argument
 * @return {boolean} result
 */
export const isElementNode = (arg: any): arg is ElementNode => {
  return arg.tag !== undefined && arg.content !== undefined;
};

export const _createLexer = (input: string[]): Lexer => {
  return new Lexer(input);
};

const simpleListPattern = /^([\s\s]*)[\*|-]\s(.+)/;
const numberListPattern = /^([\s\s]*)\d+\.\s(.+)/;
const quotePattern = /^>\s*([\s\>]*.+)/;
const codeBlockParenPattern = /^```$/;

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
      if (this._isList(input[i])) {
        while (this._isList(input[i])) i++;

        if (_listIndex !== i) {
          const parseResult = this._parseList(input.slice(_listIndex, i), simpleListPattern);
          rsltStr.push(parseResult);
          i--;
          continue;
        }
      } else if (this._isNumberList(input[i])) {
        while (this._isNumberList(input[i])) i++;

        if (_listIndex !== i) {
          const parseResult = this._parseList(input.slice(_listIndex, i), numberListPattern);
          rsltStr.push(parseResult);
          i--;
          continue;
        }
      } else if (this._isQuoteBlock(input[i])) {
        const quoteIndex = i;
        while (input[i] !== '' && i < input.length) i++;
        const parseResult = this._parse(this._encloseQuote(input.slice(quoteIndex, i)));
        rsltStr.push({
          tag: 'blockquote',
          content: parseResult,
        });
        continue;
      } else if (this._isCodeBlockStart(input[i])) {
        const codeIndex = ++i;
        while (!this._isCodeBlockStart(input[i])) i++;
        // escapeさせる
        rsltStr.push({
          tag: 'code',
          content: this._paseCodeBlock(input.slice(codeIndex, i)).join('<br />'),
        });
        continue;
      }
      // normal text <h\d> or <p>
      rsltStr.push(this._parseLine(input[i]));
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
      content: this._inlineParse(input.substring(sharpCount === 0 ? sharpCount : sharpCount + 1)),
    };
  }

  /**
   * check whether input is list
   * @param {string} input string
   * @return {boolean} whether input is list
   */
  private _isList(input: string): boolean {
    return simpleListPattern.test(input);
  }

  /**
   * check whether input is number list
   * @param {string} input string
   * @return {boolean} whether input is list
   */
  private _isNumberList(input: string): boolean {
    return numberListPattern.test(input);
  }

  /**
   * check block string is quote
   * @param {string} input quote string
   * @return {boolean} result
   */
  private _isQuoteBlock(input: string): boolean {
    return input.charAt(0) === '>';
  }

  /**
   * test line is code block paren
   * @param {string} input string
   * @return {boolean} result
   */
  private _isCodeBlockStart(input: string): boolean {
    return codeBlockParenPattern.test(input);
  }

  /**
   * escape string list
   * @param {string[]} input texts
   * @return {string[]} escaped string[]
   */
  private _paseCodeBlock(input: string[]): string[] {
    return input.map((item) => _escapeCodeString(item));
  }

  /**
   * enclose quote texts
   * @param {string} input texts
   * @return {string[]} string array
   */
  private _encloseQuote(input: string[]): string[] {
    return input.map((item) => {
      const rslt = item.match(quotePattern) as string[] | null;
      return rslt !== null ? rslt[1] : item;
    });
  }
  /**
   * parse list to ElementNode
   * @param {string} input input lists
   * @param {RegExp} pattern parse pattern
   * @param {number} nowIndent indent length
   * @return {ElementNode | ElementNode[]} results
   */
  private _parseList(input: string[], pattern: RegExp, nowIndent: number = 0): ElementNode {
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

        const parseResult = this._parseList(input.slice(startIdnex, i), pattern, indentLength);
        (resultsNode.content as ElementNode[])[
          (resultsNode.content as ElementNode[]).length - 1
        ].children = parseResult;
        i--;
        continue;
      }

      (resultsNode.content as ElementNode[]).push({
        tag: 'li',
        content: this._inlineParse(content),
      });
    }
    return resultsNode;
  }
  /**
   * parse one line string and replace link and img
   * @private
   * @param {string} input [input value]
   * @return {string} [parsed_text]
   */
  private _inlineParse(input: string): string {
    const _imagePattern = /!\[(.*?)\]\((.*?)\)/g;
    const _imageTemplate = `<img class="flav-md-img" src="$2" alt="$1">`;
    const _linkPattern = /\[(.*?)\]\((.*?)\)/g;
    const _linkTemplate = `<a class="flav-md-a" href="$2" alt="$1">$1</a>`;
    const _codePattern = /`(.*?)`/g;
    const _codeTemplate = `<code class="flav-md-code-inline">$1</code>`;
    const _strongPattern = /\*{2}(.*?)\*{2}/g;
    const _strongTemplate = `<strong class="flav-md-strong">$1</strong>`;
    const _emPattern = /\*(.*?)\*/g;
    const _emTemplate = `<em class="flav-md-em">${_escapeCodeString('$1')}</em>`;
    const _input = input;
    return _input
      .replace(_imagePattern, _imageTemplate)
      .replace(_linkPattern, _linkTemplate)
      .replace(_codePattern, _codeTemplate)
      .replace(_strongPattern, _strongTemplate)
      .replace(_emPattern, _emTemplate);
  }
}
