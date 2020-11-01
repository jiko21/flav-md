export type Table = {
  head: TableHead[];
  body: string[][];
};

export type TableHead = {
  cell: string;
  align: Align;
};

enum Align {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

const tableHeadPattern = /(?:\s?(.+?)\s?\|)+?/gm;

/**
 * check the table start
 * @param {string} input
 * @return {boolean} is table?
 */
export const isTableBlockStart = (input: string): boolean => {
  return (
    input[0] === '|' && input.substr(1).match(tableHeadPattern) !== null && input.slice(-1) === '|'
  );
};

/**
 * get table columns
 * @param {string} input
 * @return {string[]} rslt
 */
const getTableColumnName = (input: string): string[] => {
  const head = [];
  let m: RegExpExecArray | null;
  const regex = tableHeadPattern;
  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    head.push(m[1].trim());
  }
  return head;
};

/**
 * get column align info
 * @param {string} input
 * @return {Align[]} align list
 */
const getColumnAlign = (input: string): Align[] => {
  const aligns = [];
  let m: RegExpExecArray | null;
  const regex = tableHeadPattern;
  while ((m = regex.exec(input)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (m[1].match(/^:-+$/)) {
      aligns.push(Align.LEFT);
    } else if (m[1].match(/^-+:$/)) {
      aligns.push(Align.RIGHT);
    } else if (m[1].match(/^:-+:$/)) {
      aligns.push(Align.CENTER);
    }
  }
  return aligns;
};

/**
 * parse table head
 * @param {string[]} input
 * @return {TableHead[]} result
 */
const getTableHeadInfo = (input: string[]): TableHead[] => {
  const head = getTableColumnName(input[0].substr(1));
  const aligns = getColumnAlign(input[1].substr(1));
  return Array.from(Array(head.length)).map((_, i) => {
    return {
      cell: head[i],
      align: aligns[i],
    };
  });
};

// eslint-disable-next-line valid-jsdoc
/**
 * parse table body from strings
 * @param {string[]} input
 * @return {[string[][], number]}
 *  table rows array and its count
 */
const parseTableBody = (input: string[]): [string[][], number] => {
  let nowAt = 0;
  const rows = [];
  while (input[nowAt] && isTableBlockStart(input[nowAt])) {
    rows.push(getTableColumnName(input[nowAt++].substr(1)));
  }
  return [rows, nowAt];
};

export const parseTable = (input: string[]): [Table, number] => {
  const tableHead = getTableHeadInfo(input.slice(0, 2));
  const [rows, skip] = parseTableBody(input.slice(2));
  return [
    {
      head: tableHead,
      body: rows,
    },
    skip + 2,
  ];
};
