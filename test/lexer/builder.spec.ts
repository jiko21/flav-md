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
          children: {
            tag: 'ul',
            content: [
              {
                tag: 'li',
                content:
                  'this is <a class="flav-md-a" href="https://www.google.co.jp/" alt="Google先生">Google先生</a>',
              },
              {
                tag: 'li',
                content: 'hogehoge3',
                children: {
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
          children: {
            tag: 'ol',
            content: [
              {
                tag: 'li',
                content: 'aaa',
              },
              {
                tag: 'li',
                content: 'ccc',
                children: {
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
    {
      tag: 'p' as Token,
      content: 'this is <strong class="flav-md-strong">hoge</strong>',
    },
    {
      tag: 'p' as Token,
      content:
        'this is <em class="flav-md-em">hoge <strong class="flav-md-strong">fuga</strong></em>',
    },
    {
      tag: 'table' as Token,
      content: {
        head: [
          {
            cell: 'head1',
            align: 'center',
          },
          {
            cell: 'head2',
            align: 'right',
          },
          {
            cell: 'head3',
            align: 'left',
          },
        ],
        body: [
          ['aaa1', 'bbb1', 'ccc1'],
          ['aaa2', 'bbb2', 'ccc2'],
        ]
      }
    },
    {
      tag: 'p' as Token,
      content:
        'aaa',
    },
  ] as ElementNode[];
  let mdNode: MdNode;
  beforeAll(() => {
    mdNode = new MdNode(text);
  });
  it('should correctly parse file', () => {
    const expected = `<h1 class="flav-md-text flav-md-h1 flav-md-h">hello</h1>
<h2 class="flav-md-text flav-md-h2 flav-md-h">world</h2>
<ul class="flav-md-ul">
  <li class="flav-md-text flav-md-li">hogehoge</li>
  <li class="flav-md-text flav-md-li">hogehoge1
    <ul class="flav-md-ul">
      <li class="flav-md-text flav-md-li">this is <a class="flav-md-a" href="https://www.google.co.jp/" alt="Google先生">Google先生</a></li>
      <li class="flav-md-text flav-md-li">hogehoge3
        <ul class="flav-md-ul">
          <li class="flav-md-text flav-md-li">hoge 4</li>
        </ul>
      </li>
    </ul>
  </li>
  <li class="flav-md-text flav-md-li">hogehoge4</li>
</ul>
<ol class="flav-md-ol">
  <li class="flav-md-text flav-md-li">hoge1</li>
  <li class="flav-md-text flav-md-li">hoge2
    <ol class="flav-md-ol">
      <li class="flav-md-text flav-md-li">aaa</li>
      <li class="flav-md-text flav-md-li">ccc
        <ol class="flav-md-ol">
          <li class="flav-md-text flav-md-li">ddd</li>
        </ol>
      </li>
    </ol>
  </li>
</ol>
<p class="flav-md-text flav-md-p">this is <a class="flav-md-a" href="https://www.google.co.jp/" alt="Google先生">Google先生</a></p>
<p class="flav-md-text flav-md-p">画像 <img class="flav-md-img" src="http://i.imgur.com/Jjwsc.jpg" alt="エビフライトライアングル"></p>
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
</code>
<p class="flav-md-text flav-md-p">this is <strong class="flav-md-strong">hoge</strong></p>
<p class="flav-md-text flav-md-p">this is <em class="flav-md-em">hoge <strong class="flav-md-strong">fuga</strong></em></p>
<table>
  <thead>
    <tr>
      <th style="text-align: center">head1</th>
      <th style="text-align: right">head2</th>
      <th style="text-align: left">head3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center">aaa1</td>
      <td style="text-align: right">bbb1</td>
      <td style="text-align: left">ccc1</td>
    </tr>
    <tr>
      <td style="text-align: center">aaa2</td>
      <td style="text-align: right">bbb2</td>
      <td style="text-align: left">ccc2</td>
    </tr>
  </tbody>
</table>
<p class="flav-md-text flav-md-p">aaa</p>`;
    const actual = mdNode.toHtmlString();
    expect(actual).toEqual(expected);
  });
});
