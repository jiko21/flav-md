import { _readMdFromFile, _readCssFromFile } from './io/file-io';
import { Lexer } from './lexer/lexer';

export default class FlavMd {
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
  readMd(mdFilePath: string): void {
    const mdText = _readMdFromFile(mdFilePath);
    const lexer = new Lexer(mdText.split('\n'));
    this.htmlText = lexer.parse().toHtmlString();
  }

  /**
   * read md file
   * @param {string} mdFilePath file path for markdown
   */
  readCss(cssFilePath: string): void {
    this.cssText = _readCssFromFile(cssFilePath);
  }

  /**
   * concat html and css
   * @return {string} html and css tags
   */
  build(): string {
    return `${this.cssText}\n${this.htmlText}`;
  }
}
