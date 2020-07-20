import { ElementNode, Lexer, Token } from '../../src/lexer/lexer';
import { MdNode } from '../../src/lexer/builder';

describe('Lexer.class', () => {
  const text = [
    '# hello',
    '## world',
    '* hogehoge',
    '* hogehoge1',
    '  * this is [Google先生](https://www.google.co.jp/)',
    '  * hogehoge3',
    '    * hoge 4',
    '* hogehoge4',
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
        tag: 'ul' as Token,
        content: [
          {
            tag: 'li',
            content: 'hogehoge',
          },
          {
            tag: 'li',
            content: 'hogehoge1',
          },
          {
            tag: 'li',
            content: {
              tag: 'ul' as Token,
              content: [
                {
                  tag: 'li',
                  content:
                    'this is <a class="flav-md-a" href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
                },
                {
                  tag: 'li',
                  content: 'hogehoge3',
                },
                {
                  tag: 'li',
                  content: {
                    tag: 'ul' as Token,
                    content: [
                      {
                        tag: 'li',
                        content: 'hoge 4',
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            tag: 'li',
            content: 'hogehoge4',
          },
        ],
      },
      {
        tag: 'p' as Token,
        content:
          'this is <a class="flav-md-a" href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
      },
      {
        tag: 'p' as Token,
        content:
          '画像 <img class="flav-md-img" src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル">',
      },
    ];
    const rslt = new MdNode(rsltNodes);
    const expected = lexer.parse();
    expect(expected).toEqual(rslt);
  });
});
