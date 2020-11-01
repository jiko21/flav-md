import { _escapeCodeString } from '../../util/string-util';

/**
 * parse one line string and replace link and img
 * @private
 * @param {string} input [input value]
 * @return {string} [parsed_text]
 */
export const inlineParse = (input: string): string => {
  const _imagePattern = /!\[(.*?)\]\((.*?)\)/g;
  const _imageTemplate = `<img class="flav-md-img" src="$2" alt="$1">`;
  const _linkPattern = /\[(.*?)\]\((.*?)\)/g;
  const _linkTemplate = `<a class="flav-md-a" href="$2" alt="$1">$1</a>`;
  const _codePattern = /`(.*?)`/g;
  const _codeTemplate = `<code class="flav-md-code-inline">$1</code>`;
  const _strongPattern = /\*{2}(.*?)\*{2}/g;
  const _strongTemplate = `<strong class="flav-md-strong">$1</strong>`;
  const _emPattern = /\*(.*?)\*/g;
  const _emTemplate = `<em class="flav-md-em">${_escapeCodeString('$1')}</em>`;
  const _input = input;
  return _input
    .replace(_imagePattern, _imageTemplate)
    .replace(_linkPattern, _linkTemplate)
    .replace(_codePattern, _codeTemplate)
    .replace(_strongPattern, _strongTemplate)
    .replace(_emPattern, _emTemplate);
};
