import { ElementNode } from './lexer';

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
        return `<${item.tag}>${item.content}</${item.tag}>`;
      })
      .join('\n');
  }
}
