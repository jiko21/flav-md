import { parseList } from '../../../src/lexer/pattern/list';
import * as inline from '../../../src/lexer/pattern/inline';
import { Token } from '../../../src/lexer/lexer';
import { simpleListPattern } from '../../../src/lexer/pattern/simpleList';
import { numberListPattern } from '../../../src/lexer/pattern/numberList';

describe('parseList', () => {
  beforeEach(() => {
    jest.spyOn(inline, 'inlineParse').mockImplementation((x) => x);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should correctly parse simple list', () => {
    const input = [
      '* hogehoge',
      '* hogehoge1',
      '  * this is test',
      '  * hogehoge3',
      '    * hoge 4',
      '* hogehoge4',
    ];
    const result = {
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
                content: 'this is test',
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
    };
    expect(parseList(input, simpleListPattern)).toEqual(result);
  });

  test('should correctly parse number list', () => {
    const input = ['1. hoge1', '2. hoge2', '  1. aaa', '  2. ccc', '    1. ddd'];
    const result = {
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
    };
    expect(parseList(input, numberListPattern)).toEqual(result);
  });
});
