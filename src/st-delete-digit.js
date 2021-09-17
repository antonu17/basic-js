import { NotImplementedError } from '../extensions/index.js';

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
export default function deleteDigit(n) {
  let nums = ('' + n).split('').map(a => +a);
  let max = 0;
  let res;
  for (let i = 0; i < nums.length; i++) {
    let attempt = Array.from(nums);
    attempt.splice(i, 1);
    let sum = attempt.reduce((s, a) => s + a, 0);
    if (sum > max) {
      max = sum;
      res = attempt;
    }
  }
  return +res.join('');
}
