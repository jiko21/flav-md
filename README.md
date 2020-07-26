# flav-md
![Node.js CI](https://github.com/jiko21/flav-md/workflows/Node.js%20CI/badge.svg)

markdown parser with css style

## About
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
const result = flav_md_1
  .createFlavMd()
  .readMd('example.md')
  .readCss('example.css')
  .build();
```

ES6 or TypeScript
```ts
import {createFlavMd} from 'flav-md';

const result = createFlavMd()
  .readMd('example.md')
  .readCss('example.css')
  .build();
```

#### load from textCommonJS
CommonJS
```js
const flavmd = require('flav-md');
const result = flavMd
  .readMdText('# hogehoge')
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
```

ES6 or TypeScript
```ts
import {createFlavMd} from 'flav-md';

const result = flavMd
  .readMdText('# hogehoge')
  .readCssText('.flav-md-h1 {color: red;}')
  .build();
```

## Document
[CSS class](https://github.com/jiko21/flav-md/wiki/CSS-class-name-for-flav-md)
