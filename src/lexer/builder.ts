import { ElementNode, Token } from './lexer';

/** Class representing a MdNode. */
export class MdNode {
  /**
   * Create a MdNode.
   * @param {ElementNode[]} elementNodes input nodes
   */
  constructor(private elementNodes: ElementNode[]) {}

  /**
   * parse each line and replace top object
   * @return {string} html string
   */
  toHtmlString(): string {
    return this.elementNodes
      .map((item: ElementNode) => {
        return this.createTag(item);
      })
      .join('\n');
  }

  /**
   * parse elementNode to html tag and child
   * @param {ElementNode} item input node
   * @return {string} html string
   */
  private createTag(item: ElementNode): string {
    const classes = this.generateClassForTheTag(item.tag);
    return `<${item.tag} class="${classes.join(' ')}">${item.content}</${item.tag}>`;
  }

  /**
   * get html class from tag name
   * @param {Token} tag input tag
   * @return {string[]} class list
   */
  private generateClassForTheTag(tag: Token): string[] {
    const tags: string[] = ['flav-md-text'];
    // 1. add class for each tag
    tags.push(`flav-md-${tag}`);
    // 2. add flav-md-h if tag is h(1-6)
    if (tag.includes('h')) {
      tags.push('flav-md-h');
    }
    return tags;
  }
}
