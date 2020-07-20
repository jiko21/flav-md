import { MdNode } from './builder';
export type Token = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'ul' | 'li';

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
  content: string | ElementNode | ElementNode[];
};

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
    const rsltStr = [] as ElementNode[];
    for (let i = 0; i < this.text.length; i++) {
      const _listIndex = i;
      while (this._isList(this.text[i])) i++;

      if (_listIndex !== i) {
        const parseResult = this._parseSimpleList(this.text.slice(_listIndex, i));
        rsltStr.push(parseResult);
        i--;
        continue;
      }

      // normal text <h\d> or <p>
      rsltStr.push(this._parseLine(this.text[i]));
    }
    return new MdNode(rsltStr);
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
   * parse list to ElementNode
   * @param {string} input input lists
   * @param {number} nowIndent indent length
   * @return {ElementNode | ElementNode[]} results
   */
  private _parseSimpleList(input: string[], nowIndent: number = 0): ElementNode {
    const resultsNode: ElementNode = {
      tag: 'ul',
      content: [] as ElementNode[],
    };
    for (let i = 0; i < input.length; i++) {
      const [indentLine, content] = (input[i].match(simpleListPattern) as string[]).splice(1, 2);
      const indentLength = indentLine.length;
      if (indentLength > nowIndent) {
        const startIdnex = i;
        while (true) {
          i++;
          if (i >= input.length) break;
          const _indentLength = (input[i].match(simpleListPattern) as string[])[1].length;
          if (_indentLength < indentLength) {
            break;
          }
        }

        const parseResult = this._parseSimpleList(input.slice(startIdnex, i), indentLength);
        (resultsNode.content as ElementNode[]).push({
          tag: 'li',
          content: parseResult,
        });
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
    const _imagePattern = /!\[(.+)\]\((.+)\)/;
    const _imageTemplate = `<img class="flav-md-img" src="$2" alt="$1">`;
    const _linkPattern = /\[(.+)\]\((.+)\)/;
    const _linkTemplate = `<a class="flav-md-a" href="$2" alt="$1">$1</a>`;
    const _input = input;
    return _input.replace(_imagePattern, _imageTemplate).replace(_linkPattern, _linkTemplate);
  }
}
