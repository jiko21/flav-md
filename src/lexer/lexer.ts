import { MdNode } from './builder';
export type Token = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

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
  content: string;
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
    const rsltStr = [] as ElementNode[];
    for (let i = 0; i < this.text.length; i++) {
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
   * parse one line string and replace link and img
   * @private
   * @param {string} input [input value]
   * @return {string} [parsed_text]
   */
  private _inlineParse(input: string): string {
    const _imagePattern = /!\[(.+)\]\((.+)\)/;
    const _imageTemplate = `<img src="$2" alt="$1">`;
    const _linkPattern = /\[(.+)\]\((.+)\)/;
    const _linkTemplate = `<a href="$2" alt="$1">$1</a>`;
    const _input = input;
    return _input.replace(_imagePattern, _imageTemplate).replace(_linkPattern, _linkTemplate);
  }
}
