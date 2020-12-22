import { FlavMd } from '../src/flavmd';
import { MdNode } from '../src/lexer/builder';

jest.mock('../src/lexer/builder');

describe('Lexer.class', () => {
  let mdNodeMock: jest.Mock;
  const htmlFile = '<h1>sample</h1>';
  const cssFile = `.flav-md-h1 {
  color: red;
}`;
  beforeAll(() => {
    mdNodeMock = MdNode as jest.Mock;
    mdNodeMock.mockImplementation(() => {
      return {
        toHtmlString: (): string => {
          return htmlFile;
        },
      };
    });
  });

  it('should be correctly render html and css', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdText('# hoge').readCssText(cssFile).build();
    expect(html).toBe(`<style>${cssFile}</style>\n${htmlFile}`);
  });

  it('should be correctly render html and css', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdText(htmlFile).readCssText(cssFile).build();
    expect(html).toBe(`<style>${cssFile}</style>\n${htmlFile}`);
  });
});
