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
    '1. hoge1',
    '2. hoge2',
    '  1. aaa',
    '  2. ccc',
    '    1. ddd',
    'this is [Google先生](https://www.google.co.jp/)',
    '画像 ![エビフライトライアングル](http://i.imgur.com/Jjwsc.jpg)',
    '> aaa',
    'bbb',
    '>> ccc',
    'ddd',
    '',
    '## world',
    '```',
    '<script src="hoge.js"></script>',
    '<script src="hoge.js"></script>',
    '```',
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
        tag: 'ol',
        content: [
          {
            tag: 'li',
            content: 'hoge1',
          },
          {
            tag: 'li',
            content: 'hoge2',
          },
          {
            tag: 'li',
            content: {
              tag: 'ol',
              content: [
                {
                  tag: 'li',
                  content: 'aaa',
                },
                {
                  tag: 'li',
                  content: 'ccc',
                },
                {
                  tag: 'li',
                  content: {
                    tag: 'ol',
                    content: [
                      {
                        tag: 'li',
                        content: 'ddd',
                      },
                    ],
                  },
                },
              ],
            },
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
      {
        tag: 'blockquote',
        content: [
          {
            tag: 'p',
            content: 'aaa',
          },
          {
            tag: 'p',
            content: 'bbb',
          },
          {
            tag: 'blockquote',
            content: [
              {
                tag: 'p',
                content: 'ccc',
              },
              {
                tag: 'p',
                content: 'ddd',
              },
            ],
          },
        ],
      },
      {
        tag: 'h2' as Token,
        content: 'world',
      },
      {
        tag: 'code',
        content:
          '&lt;script src=&quot;hoge.js&quot;&gt;&lt;/script&gt;<br />&lt;script src=&quot;hoge.js&quot;&gt;&lt;/script&gt;',
      },
    ];
    const expected = new MdNode(rsltNodes);
    const rslt = lexer.parse();
    expect(rslt).toEqual(expected);
  });
});
