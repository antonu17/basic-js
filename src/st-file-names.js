import { NotImplementedError } from '../extensions/index.js';

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */

export default function renameFiles(names) {
  let counters = [];

  for (let i = 0; i < names.length; i++) {
    let file = counters.filter(a => a.name == names[i])[0];
    if (!file) {
      file = { name: names[i], count: 1 }
      counters.push(file);
    }
    while (names.slice(0, i).includes(names[i])) {
      names[i] = names[i] + '(' + file.count++ + ')';
    }
  }

  return names;
}
