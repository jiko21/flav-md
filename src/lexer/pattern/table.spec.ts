import { describe, it, expect } from 'bun:test';
import { isTableBlockStart, parseTable } from './table';

describe('isTableBlockStart', () => {
  it('should return true when input is table start', () => {
    const input = '|  head1  | head2 | head3|';
    expect(isTableBlockStart(input)).toBe(true);
  });

  it('should return false when input is not table start1', () => {
    const input = '  head1  | head2 | head3|';
    expect(isTableBlockStart(input)).toBe(false);
  });

  it('should return false when input is not table start2', () => {
    const input = '|  head1  | head2 | head3';
    expect(isTableBlockStart(input)).toBe(false);
  });
});

describe('parseTable', () => {
  it('correctly parse table', () => {
    const input = [
      '|  head1  | head2 | head3|',
      '|:----:|-----:|:----- |',
      '|  aaa1  | bbb1 | ccc1|',
      '|  aaa2 | bbb2 | ccc2|',
    ];
    const result = [
      {
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
      4,
    ];
    expect(parseTable(input)).toEqual(result);
  });
});
