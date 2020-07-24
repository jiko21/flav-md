import { _readMdFromFile, _readCssFromFile } from './io/file-io';
import { Lexer } from './lexer/lexer';

export class FlavMd {
  // eslint-disable-next-line require-jsdoc
  private htmlText: string;
  // eslint-disable-next-line require-jsdoc
  private cssText: string;

  constructor() {
    this.htmlText = '';
    this.cssText = '';
  }

  /**
   * read md file
   * @param {string} mdFilePath file path for markdown
   */
  readMd(mdFilePath: string): FlavMd {
    const mdText = _readMdFromFile(mdFilePath);
    const lexer = new Lexer(mdText.split('\n'));
    this.htmlText = lexer.parse().toHtmlString();
    return this;
  }

  /**
   * read md file
   * @param {string} mdFilePath file path for markdown
   */
  readCss(cssFilePath: string): FlavMd {
    this.cssText = _readCssFromFile(cssFilePath);
    return this;
  }

  /**
   * concat html and css
   * @return {string} html and css tags
   */
  build(): string {
    return `${this.cssText}\n${this.htmlText}`;
  }
}

export function createFlavMd(): FlavMd {
  return new FlavMd();
}
