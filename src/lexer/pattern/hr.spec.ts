import { describe, it, expect } from 'bun:test';
import { isHr } from "./hr";

describe('isHr', () => {
  it('should return true when input is hr', () => {
    const text = `---`;
    expect(isHr(text)).toBe(true);
  });

  it('should return false when input is not hr', () => {
    const text = `--`;
    expect(isHr(text)).toBe(false);
  });
});