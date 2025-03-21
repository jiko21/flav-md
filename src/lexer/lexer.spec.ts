import { MdNode } from './builder';
import { ElementNode, Lexer, Token } from './lexer';

describe('Lexer.class', () => {
  const text = [
    '# hello',
    '## world',
    '* hogehoge',
    '* hogehoge1',
    '  * this is [Google先生](https://example.com)',
    '  * hogehoge3',
    '    * hoge 4',
    '* hogehoge4',
    '1. hoge1',
    '2. hoge2',
    '  1. aaa',
    '  2. ccc',
    '    1. ddd',
    'this is [Google先生](https://example.com)',
    '画像 ![エビフライトライアングル](https://example.com)',
    '> aaa',
    'bbb',
    '>> ccc',
    'ddd',
    '',
    '## world',
    '```html',
    '<script src="hoge.js"></script>',
    '<script src="hoge.js"></script>',
    '```',
    'this is `hoge` and `fuga`',
    'this is *hoge*',
    'this is **hoge**',
    'this is *hoge **fuga***',
    '|  head1  | head2 | head3|',
    '|:----:|-----:|:----- |',
    '|  aaa1  | bbb1 | ccc1|',
    '|  aaa2 | bbb2 | ccc2|',
    '--- ',
    'aaa',
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
            children: {
              tag: 'ul',
              content: [
                {
                  tag: 'li',
                  content:
                    'this is <a class="flav-md-a" href="https://example.com" alt="Google先生">Google先生</a>',
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
          'this is <a class="flav-md-a" href="https://example.com" alt="Google先生">Google先生</a>',
      },
      {
        tag: 'p' as Token,
        content:
          '画像 <img class="flav-md-img" src="https://example.com" alt="エビフライトライアングル">',
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
        content:
          'this is <code class="flav-md-code-inline">hoge</code> and <code class="flav-md-code-inline">fuga</code>',
      },
      {
        tag: 'p' as Token,
        content: 'this is <em class="flav-md-em">hoge</em>',
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
          ],
        },
      },
      {
        tag: 'hr' as Token,
      },
      {
        tag: 'p' as Token,
        content: 'aaa',
      },
    ] as ElementNode[];
    const expected = new MdNode(rsltNodes);
    const rslt = lexer.parse();
    expect(rslt).toEqual(expected);
  });
});
