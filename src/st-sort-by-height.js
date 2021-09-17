import { NotImplementedError } from '../extensions/index.js';

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
export default function sortByHeight(arr) {
  let negative_ids = arr.map((a, i) => a == -1 ? i : -1).filter(a => a != -1);
  let sorted = arr.filter(a => a != -1).sort((a, b) => a - b);
  for (let i of negative_ids) {
    sorted.splice(i, 0, -1);
  }
  return sorted;
}
