import { NotImplementedError } from '../extensions/index.js';

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
export default function encodeLine(str) {
  if (str.length == 0) {
    return '';
  }

  let res = [];
  let last = str[0];
  let counter = 0;

  for (let c of str) {
    if (c == last) {
      counter++;
      continue;
    }
    res.push([counter, last]);
    last = c;
    counter = 1;
  }
  res.push([counter, last]);

  return res.flat().filter(a => a != 1).join('');
}
