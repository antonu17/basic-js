import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement chainMaker object according to task description
 *
 */

export default {

  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (!this.chain) {
      this.chain = [];
    }
    if (arguments.length === 0) {
      value = '( )';
    }
    value = '( ' + value + ' )';
    this.chain.push(value);
    return this;
  },
  removeLink(position) {
    if (!this.chain) {
      this.chain = [];
    }
    if (typeof position !== 'number' || position < 1 || position > this.chain.length) {
      this.chain = [];
      throw new Error(`You can't remove incorrect link!`);
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let result = this.chain.join('~~');
    this.chain = [];
    return result;
  }
};
