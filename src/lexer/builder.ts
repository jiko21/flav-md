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
   * @param {number} indent indent size
   * @return {string} html string
   */
  private createTag(item: ElementNode, indent: number = 0): string {
    if (item.tag === 'ul') {
      return `<ul class="flav-md-ul">\n${this.parseNestedTag(
        item.content as ElementNode[],
        indent + 2,
      )}${' '.repeat(indent)}</ul>`;
    } else if (item.tag === 'ol') {
      return `<ol class="flav-md-ol">\n${this.parseNestedTag(
        item.content as ElementNode[],
        indent + 2,
      )}${' '.repeat(indent)}</ol>`;
    } else if (item.tag === 'li') {
      let children = '';
      if (item.children !== undefined) {
        children = ' '.repeat(indent + 2) + this.createTag(item.children, indent + 2);
        return (
          ' '.repeat(indent) +
          `<li class="flav-md-text flav-md-li">${item.content}\n${children}\n${' '.repeat(
            indent,
          )}</li>`
        );
      } else {
        return ' '.repeat(indent) + `<li class="flav-md-text flav-md-li">${item.content}</li>`;
      }
    } else if (item.tag === 'blockquote') {
      const classes = this.generateClassForTheTag(item.tag);
      return `${' '.repeat(indent)}<blockquote class="${classes.join(' ')}">\n${this.parseNestedTag(
        item.content as ElementNode[],
        indent + 2,
      )}${' '.repeat(indent)}</blockquote>`;
    } else if (item.tag === 'code') {
      return `<code class="flav-md-code">\n  ${item.content}\n</code>`;
    } else {
      const classes = this.generateClassForTheTag(item.tag);
      return `${' '.repeat(indent)}<${item.tag} class="${classes.join(' ')}">${item.content}</${
        item.tag
      }>`;
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
