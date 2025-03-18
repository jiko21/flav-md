const HR_PATTERN = /^\-{3,}\s*$/;
export const isHr = (input: string): boolean => {
  return HR_PATTERN.test(input);
}