import { _readMdFromFile } from '../../src/io/file-io';
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
