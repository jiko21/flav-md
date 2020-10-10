import { ElementNode, Table, TableHead, Token } from './lexer';

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
    const classes = this.generateClassForTheTag(item.tag);
    switch (item.tag) {
      case 'ul':
        return `<ul class="flav-md-ul">\n${this.parseNestedTag(
          item.content as ElementNode[],
          indent + 2,
        )}${' '.repeat(indent)}</ul>`;
      case 'ol':
        return `<ol class="flav-md-ol">\n${this.parseNestedTag(
          item.content as ElementNode[],
          indent + 2,
        )}${' '.repeat(indent)}</ol>`;
      case 'li':
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
      case 'blockquote':
        return `${' '.repeat(indent)}<blockquote class="${classes.join(
          ' ',
        )}">\n${this.parseNestedTag(item.content as ElementNode[], indent + 2)}${' '.repeat(
          indent,
        )}</blockquote>`;
      case 'code':
        return `<code class="flav-md-code">\n  ${item.content}\n</code>`;
      case 'table':
        return this.generateTable(item);
      default:
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
   * parse element to table
   * @param {ElementNode} node table tree
   * @return {string} html table string
   */
  private generateTable(node: ElementNode): string {
    const table = node.content as Table;
    const head = table.head;
    const body = table.body;
    // create thead section
    const thead = this.createThead(head);
    const tbody = this.createTbody(head, body);
    return `<table>
${thead}
${tbody}
</table>`;
  }

  /**
   * parse thead
   * @param {TableHead[]} head
   * @return {string} tbody
   */
  private createThead(head: TableHead[]): string {
    return `  <thead>
    <tr>
${head
  .map((item) => {
    return `      <th style="text-align: ${item.align}">${item.cell}</th>`;
  })
  .join('\n')}
    </tr>
  </thead>`;
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * parse head and columns to tbody
   * @param {TableHead[]} head column info
   * @param {string[][]} body row data
   * @return {string} html tbody
   */
  private createTbody(head: TableHead[], body: string[][]): string {
    const trs = body
      .map((rows) => {
        const tds = rows
          .map((item, i) => {
            return `      <td style="text-align: ${head[i].align}">${item}</td>`;
          })
          .join('\n');
        return `    <tr>
${tds}
    </tr>`;
      })
      .join('\n');
    return `  <tbody>
${trs}
  </tbody>`;
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
