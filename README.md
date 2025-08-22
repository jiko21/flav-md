![flavmd-logo](./docs/logo.png)
# flav-md
![Node.js CI](https://github.com/jiko21/flav-md/workflows/Node.js%20CI/badge.svg)

markdown parser with css style

## About

flav-md is a lightweight and flexible Markdown parser that converts Markdown to HTML with automatic CSS class generation. Unlike other Markdown parsers, flav-md adds semantic CSS classes to every HTML element, making it incredibly easy to style the output with CSS.

### Key Features

- 🚀 **Lightweight** - Minimal dependencies and fast parsing
- 🎨 **CSS-Ready** - Automatic CSS class generation for all elements
- 📝 **Full Markdown Support** - Headers, lists, links, images, code blocks, tables, and more
- 🔧 **Easy Integration** - Works with Node.js, ES6, and TypeScript
- 💾 **Flexible Input** - Read from files or strings
- 🎯 **Semantic Classes** - Predictable and consistent class naming

### Use Cases

- **Documentation sites** - Generate styled docs from Markdown
- **Blog systems** - Convert posts with custom styling
- **Static site generators** - Build sites with Markdown content
- **Content management** - Process user-generated Markdown content
## How to use
### install
You can install via npm with
```bash
npm install flav-md
```

### import flav-md
#### load from file

CommonJS
```js
const flavmd = require('flav-md');
const result = flavmd
  .createFlavMd()
  .readMdFile('example.md')
  .readCssFile('example.css')
  .build();
```

ES6 or TypeScript
```ts
import {createFlavMd} from 'flav-md';

const result = createFlavMd()
  .readMdFile('example.md')
  .readCssFile('example.css')
  .build();
```

#### load from text
CommonJS
```js
const flavmd = require('flav-md');
const result = flavmd
  .createFlavMd()
  .readMdText('# hogehoge')
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
```

ES6 or TypeScript
```ts
import {createFlavMd} from 'flav-md';

const result = createFlavMd()
  .readMdText('# hogehoge')
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
```

## Documentation

### CSS Classes

flav-md automatically generates CSS classes for all HTML elements. For a complete reference of all available CSS classes and styling examples, see:

- **[CSS Class Reference](./CSS-Class-Wiki.md)** - Complete guide to all CSS classes
- **[GitHub Wiki](https://github.com/jiko21/flav-md/wiki/CSS-class-name-for-flav-md)** - Additional documentation

### Examples

Check out the [examples](./examples/) directory for sample Markdown files and CSS styling.

### API Reference

#### `createFlavMd()`
Creates a new FlavMd instance.

```typescript
const flavmd = createFlavMd();
```

#### `.readMdFile(filePath: string)`
Reads Markdown content from a file.

```typescript
flavmd.readMdFile('example.md');
```

#### `.readMdText(mdText: string)`
Reads Markdown content from a string.

```typescript
flavmd.readMdText('# Hello World');
```

#### `.readCssFile(filePath: string)`
Reads CSS content from a file.

```typescript
flavmd.readCssFile('styles.css');
```

#### `.readCssText(cssText: string)`
Reads CSS content from a string.

```typescript
flavmd.readCssText('.flav-md-h1 { color: blue; }');
```

#### `.build()`
Generates the final HTML with embedded CSS.

```typescript
const html = flavmd.build();
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [jiko21](https://github.com/jiko21)
