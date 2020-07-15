import { _readMdFromFile, _readCssFromFile } from '../../src/io/file-io';
import * as path from 'path';

describe('_readMdFromFile', () => {
  const filePath = path.join(__dirname, '../data/example.md');
  it('should correctly read file', () => {
    const actual = _readMdFromFile(filePath);
    const expected = `# hello
## world
this is sample
`;
    expect(actual).toBe(expected);
  });
});

describe('_readCssFromFile', () => {
  const filePath = path.join(__dirname, '../data/example.css');
  it('should correctly read file', () => {
    const actual = _readCssFromFile(filePath);
    const expected = `.flav-md-h1 {
  color: red;
}

.flav-md-p {
  color: pink;
}
`;
    expect(actual).toBe(expected);
  });
});
