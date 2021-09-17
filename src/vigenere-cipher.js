import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */

function isEligible(char) {
  return char.charCodeAt(0) >= 'A'.charCodeAt(0) && char.charCodeAt(0) <= 'Z'.charCodeAt(0);
}

function getKey(str, key) {
  return str.split('').map((_, i) => key[i % key.length]).join('');
}

function compress(str) {
  return str.split('')
    .filter(a => isEligible(a))
    .join('');
}

function decompress(str, chars) {
  chars = chars.split('');
  for (let i = 0; i < str.length; i++) {
    if (isEligible(str[i])) {
      continue;
    }
    chars.splice(i, 0, str[i]);
  }
  return chars.join('');
}

function getCharNumber(char) {
  return char.charCodeAt(0) - 'A'.charCodeAt(0);
}

function encryptChar(char, keyChar) {
  return String.fromCharCode(((getCharNumber(char) + getCharNumber(keyChar)) % 26) + 'A'.charCodeAt(0))
}

function decryptChar(char, keyChar) {
  return String.fromCharCode(((getCharNumber(char) - getCharNumber(keyChar) + 26) % 26) + 'A'.charCodeAt(0))
}

export default class VigenereCipheringMachine {
  constructor(direct = true) {
    this._direct = direct;
  }

  encrypt(str, key) {
    if (arguments.length < 2 || typeof str === 'undefined' || typeof key === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    str = str.toUpperCase();
    key = key.toUpperCase();

    let chars = compress(str);
    let cryptoKey = getKey(chars, key);

    chars = chars.split('')
      .map((a, i) => encryptChar(a, cryptoKey[i]))
      .join('');

    chars = decompress(str, chars);

    if (!this._direct) {
      chars = chars.split('').reverse().join('');
    }

    return chars;
  }

  decrypt(str, key) {
    if (arguments.length < 2 || typeof str === 'undefined' || typeof key === 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    str = str.toUpperCase();
    key = key.toUpperCase();

    let chars = compress(str);
    let cryptoKey = getKey(chars, key);

    chars = chars.split('')
      .map((a, i) => decryptChar(a, cryptoKey[i]))
      .join('');

    chars = decompress(str, chars);

    if (!this._direct) {
      chars = chars.split('').reverse().join('');
    }

    return chars;
  }
}
