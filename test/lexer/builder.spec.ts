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
      content: 'this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
    },
    {
      tag: 'p' as Token,
      content: '画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル">',
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
<ol>
  <li>hoge1</li>
  <li>hoge2</li>
  <li><ol>
    <li>aaa</li>
    <li>ccc</li>
    <li><ol>
      <li>ddd</li>
    </ol></li>
  </ol></li>
</ol>
<p class="flav-md-text flav-md-p">this is <a href="https://www.google.co.jp/" alt="Google先生">Google先生</a></p>
<p class="flav-md-text flav-md-p">画像 <img src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル"></p>
<blockquote class="flav-md-text flav-md-blockquote">
  <p class="flav-md-text flav-md-p">aaa</p>
  <p class="flav-md-text flav-md-p">bbb</p>
  <blockquote class="flav-md-text flav-md-blockquote">
    <p class="flav-md-text flav-md-p">ccc</p>
    <p class="flav-md-text flav-md-p">ddd</p>
  </blockquote>
</blockquote>
<h2 class="flav-md-text flav-md-h2 flav-md-h">world</h2>
<code class="flav-md-code">
  &lt;script src=&quot;hoge.js&quot;&gt;&lt;/script&gt;<br />&lt;script src=&quot;hoge.js&quot;&gt;&lt;/script&gt;
</code>`;
    const actual = mdNode.toHtmlString();
    expect(actual).toEqual(expected);
  });
});
