import { describe, it, expect, test } from 'bun:test';
import { inlineParse } from './inline';

describe('inlineParse', () => {
  test('should correctly parse image pattern', () => {
    const input = '![hoge1](hoge2)';
    const result = '<img class="flav-md-img" src="hoge2" alt="hoge1">';
    expect(inlineParse(input)).toEqual(result);
  });

  test('should correctly parse link pattern', () => {
    const input = '[hoge1](hoge2)';
    const result = '<a class="flav-md-a" href="hoge2" alt="hoge1">hoge1</a>';
    expect(inlineParse(input)).toEqual(result);
  });

  test('should correctly code pattern', () => {
    const input = '`hoge`';
    const result = '<code class="flav-md-code-inline">hoge</code>';
    expect(inlineParse(input)).toEqual(result);
  });

  test('should correctly strong pattern', () => {
    const input = '**hoge**';
    const result = '<strong class="flav-md-strong">hoge</strong>';
    expect(inlineParse(input)).toEqual(result);
  });

  test('should correctly emphasis pattern', () => {
    const input = '*hoge*';
    const result = '<em class="flav-md-em">hoge</em>';
    expect(inlineParse(input)).toEqual(result);
  });
});
