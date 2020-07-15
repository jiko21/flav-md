import * as fs from 'fs';

const _readFile = (filename: string): string => {
  const content = fs.readFileSync(filename, 'utf8');
  return content;
};

export const _readMdFromFile = (filename: string): string => {
  return _readFile(filename);
};

export const _readCssFromFile = (filename: string): string => {
  return _readFile(filename);
};
