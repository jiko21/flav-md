import { _createLexer } from './lexer/lexer';

/** class for FlavMd */
export class FlavMd {
  private htmlText: string;
  private cssText: string;

  /**
   * constructor
   */
  constructor() {
    this.htmlText = '';
    this.cssText = '';
  }

  /**
   * read md from string
   * @param {string} mdText md string
   * @return {FlavMd} flavmd istance itself
   */
  readMdText(mdText: string): FlavMd {
    const lexer = _createLexer(mdText.split('\n'));
    this.htmlText = lexer.parse().toHtmlString();
    return this;
  }

  /**
   * read from css string
   * @param {string} cssText
   * @return {FlavMd} flavmd instance
   */
  readCssText(cssText: string): FlavMd {
    this.cssText = cssText;
    return this;
  }

  /**
   * concat html and css
   * @return {string} html and css tags
   */
  build(): string {
    return `<style>${this.cssText}</style>\n${this.htmlText}`;
  }
}

/**
 * generate flavmd instance
 * @return {FlavMd} flavmd instance
 */
export function createFlavMd(): FlavMd {
  return new FlavMd();
}
