import * as fs from 'fs';

export const _readMdFromFile = (filename: string): string => {
  const content = fs.readFileSync(filename, 'utf8');
  return content;
};
