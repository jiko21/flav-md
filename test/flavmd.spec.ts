import { FlavMd } from '../src/flavmd';
import { MdNode } from '../src/lexer/builder';
import * as fileIo from '../src/io/file-io';

jest.mock('../src/lexer/builder');

describe('Lexer.class', () => {
  let readMdMock: any;
  let readCssMock: any;
  let mdNodeMock: jest.Mock;
  const mdFile = `# sample`;
  const htmlFile = '<h1>sample</h1>';
  const cssFile = `.flav-md-h1 {
  color: red;
}`;
  beforeAll(() => {
    readMdMock = jest.spyOn(fileIo, '_readMdFromFile');
    readMdMock.mockReturnValue(mdFile);
    readCssMock = jest.spyOn(fileIo, '_readCssFromFile');
    readCssMock.mockReturnValue(cssFile);
    mdNodeMock = MdNode as jest.Mock;
    mdNodeMock.mockImplementation(() => {
      return {
        toHtmlString: (): string => {
          return htmlFile;
        },
      };
    });
  });

  it('should call readHtmlFile When readMd', () => {
    const flavMd = new FlavMd();
    flavMd.readMdFile('sample.md');
    expect(readMdMock).toHaveBeenCalled();
  });

  it('should call readHtmlFile When readCss', () => {
    const flavMd = new FlavMd();
    flavMd.readCssFile('sample.md');
    expect(readCssMock).toHaveBeenCalled();
  });

  it('should be correctly render html and css', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdFile('a').readCssFile('a').build();
    expect(html).toBe(`<style>${cssFile}</style>\n${htmlFile}`);
  });

  it('should be correctly render html and css', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdText(htmlFile).readCssText(cssFile).build();
    expect(html).toBe(`<style>${cssFile}</style>\n${htmlFile}`);
  });
});
