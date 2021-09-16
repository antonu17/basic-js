import { NotImplementedError } from '../extensions/index.js';

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
export default function repeater(str, options) {

  function repeat(str, count = 1, separator) {
    if (typeof str === 'undefined') {
      return '';
    }
    let res = '';
    for (let i = 0; i < count; i++) {
      res += str;
      if (i < count - 1) {
        res += separator;
      }
    }
    return res;
  }

  let s = str + repeat(options.addition, options.additionRepeatTimes, options.additionSeparator ? options.additionSeparator : '|');
  return repeat(s, options.repeatTimes, options.separator ? options.separator : '+');
}
