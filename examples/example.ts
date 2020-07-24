import flavmd from 'flav-md';

const result = flavmd.readMd('exmaple.md').readCss('exmaple.css').build();

console.log(result);
