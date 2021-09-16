import { NotImplementedError } from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`'arr' parameter must be an instance of the Array!`)
  }

  let stage = Array.from(arr).map(a => ({ value: a, count: 1 }));
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case `--discard-next`:
        if (i < arr.length - 1) {
          stage[i + 1].count--;
        }
        break;
      case `--discard-prev`:
        if (i > 0) {
          stage[i - 1].count--;
        }
        break;
      case `--double-next`:
        if (i < arr.length - 1 && stage[i + 1].count) {
          stage[i + 1].count++;
        }
        break;
      case `--double-prev`:
        if (i > 0 && stage[i - 1].count) {
          stage[i - 1].count++;
        }
        break;
    }
  }

  let result = [];
  for (let a of stage) {
    if ([`--discard-next`, `--discard-prev`, `--double-next`, `--double-prev`].includes(a.value) || a.count < 1) {
      continue;
    }
    for (let i = 0; i < a.count; i++) {
      result.push(a.value);
    }
  }

  return result;
}
