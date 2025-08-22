import { describe, it, expect } from 'bun:test';
import { FlavMd, createFlavMd } from '../src/flavmd';

describe('FlavMd', () => {
  const cssFile = `.flav-md-h1 {
  color: red;
}`;

  it('should correctly render html and css', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdText('# hoge').readCssText(cssFile).build();
    expect(html).toContain(`<style>${cssFile}</style>`);
    expect(html).toContain('<h1 class="flav-md-text flav-md-h1 flav-md-h">hoge</h1>');
  });

  it('should correctly render just css with plain text', () => {
    const flavMd = new FlavMd();
    const html = flavMd.readMdText('plain text').readCssText(cssFile).build();
    expect(html).toContain(`<style>${cssFile}</style>`);
    expect(html).toContain('<p class="flav-md-text flav-md-p">plain text</p>');
  });
});

describe('createFlavMd', () => {
  it('should create a new FlavMd instance', () => {
    const flavMd = createFlavMd();
    expect(flavMd).toBeInstanceOf(FlavMd);
  });

  it('should work with the factory function', () => {
    const cssFile = `.flav-md-p { color: blue; }`;
    const html = createFlavMd()
      .readMdText('Hello **world**!')
      .readCssText(cssFile)
      .build();
    
    expect(html).toContain(`<style>${cssFile}</style>`);
    expect(html).toContain('<p class="flav-md-text flav-md-p">Hello <strong class="flav-md-strong">world</strong>!</p>');
  });
});
