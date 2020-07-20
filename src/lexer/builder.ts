import { ElementNode, Token, isElementNode } from './lexer';

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
   * @param {number} indent indent size
   * @return {string} html string
   */
  private createTag(item: ElementNode, indent: number = 0): string {
    if (item.tag === 'ul') {
      return `<ul>\n${this.parseNestedTag(item.content as ElementNode[], indent + 2)}${' '.repeat(
        indent,
      )}</ul>`;
    } else if (item.tag === 'ol') {
      return `<ol>\n${this.parseNestedTag(item.content as ElementNode[], indent + 2)}${' '.repeat(
        indent,
      )}</ol>`;
    } else if (item.tag === 'li') {
      if (isElementNode(item.content)) {
        return ' '.repeat(indent) + `<li>${this.createTag(item.content, indent)}</li>`;
      } else {
        return ' '.repeat(indent) + `<li>${item.content}</li>`;
      }
    } else {
      const classes = this.generateClassForTheTag(item.tag);
      return `<${item.tag} class="${classes.join(' ')}">${item.content}</${item.tag}>`;
    }
  }

  /**
   * parse elementNode to html tag and child
   * @param {ElementNode[]} items input node
   * @param {number} indent indent size
   * @return {string} html string
   */
  private parseNestedTag(items: ElementNode[], indent: number = 0): string {
    let results = '';
    items.forEach((item) => {
      results += `${this.createTag(item, indent)}\n`;
    });
    return results;
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
