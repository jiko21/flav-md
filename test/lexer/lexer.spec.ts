import { ElementNode, Lexer, Token } from '../../src/lexer/lexer';
import { MdNode } from '../../src/lexer/builder';

describe('Lexer.class', () => {
  const text = [
    '# hello',
    '## world',
    'this is [Google先生](https://www.google.co.jp/)',
    '画像 ![エビフライトライアングル](http://i.imgur.com/Jjwsc.jpg)',
  ];
  let lexer: Lexer;
  beforeAll(() => {
    lexer = new Lexer(text);
  });
  it('should correctly parse file', () => {
    const rsltNodes: ElementNode[] = [
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
    const rslt = new MdNode(rsltNodes);
    const expected = lexer.parse();
    expect(expected).toEqual(rslt);
  });
});
