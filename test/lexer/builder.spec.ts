import { Token } from '../../src/lexer/lexer';
import { MdNode } from '../../src/lexer/builder';

describe('Lexer.class', () => {
  const text = [
    {
      tag: 'h1' as Token,
      content: 'hello',
    },
    {
      tag: 'h2' as Token,
      content: 'world',
    },
    {
      tag: 'p' as Token,
      content: 'this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
    },
    {
      tag: 'p' as Token,
      content: '画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル">',
    },
  ];
  let mdNode: MdNode;
  beforeAll(() => {
    mdNode = new MdNode(text);
  });
  it('should correctly parse file', () => {
    const expected = `<h1>hello</h1>
<h2>world</h2>
<p>this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a></p>
<p>画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル"></p>`;
    const actual = mdNode.toHtmlString();
    expect(expected).toEqual(actual);
  });
});
