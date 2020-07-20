import { Token, ElementNode } from '../../src/lexer/lexer';
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
                  'this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
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
                      content: 'hoge4',
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
      content: 'this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
    },
    {
      tag: 'p' as Token,
      content: '画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル">',
    },
  ] as ElementNode[];
  let mdNode: MdNode;
  beforeAll(() => {
    mdNode = new MdNode(text);
  });
  it('should correctly parse file', () => {
    const expected = `<h1 class="flav-md-text flav-md-h1 flav-md-h">hello</h1>
<h2 class="flav-md-text flav-md-h2 flav-md-h">world</h2>
<ul>
  <li>hogehoge</li>
  <li>hogehoge1</li>
  <li><ul>
    <li>this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a></li>
    <li>hogehoge3</li>
    <li><ul>
      <li>hoge4</li>
    </ul></li>
  </ul></li>
  <li>hogehoge4</li>
</ul>
<p class="flav-md-text flav-md-p">this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a></p>
<p class="flav-md-text flav-md-p">画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル"></p>`;
    const actual = mdNode.toHtmlString();
    expect(actual).toEqual(expected);
  });
});
