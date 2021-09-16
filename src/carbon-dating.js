import { NotImplementedError } from '../extensions/index.js';

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
export default function dateSample(sampleActivity) {
  if (typeof sampleActivity !== 'string') {
    return false;
  }
  let sample = +sampleActivity;
  if (Number.isNaN(sample) || typeof sample !== 'number') {
    return false;
  }
  if (sample > MODERN_ACTIVITY || sample <= 0) {
    return false;
  }

  let a = MODERN_ACTIVITY / sample;
  let k = 0.693 / HALF_LIFE_PERIOD;
  let age = Math.log(a) / k;
  return Math.ceil(age);
}
