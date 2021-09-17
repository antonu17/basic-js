import { NotImplementedError } from '../extensions/index.js';

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
export default function getDNSStats(domains) {
  let stats = {}
  for (let domain of domains) {
    let subdomain = '';
    for (let part of domain.split('.').reverse().map(a => '.' + a)) {
      subdomain += part;
      if (!(subdomain in stats)) {
        stats[subdomain] = 0;
      }
      stats[subdomain] += 1;
    }
  }
  return stats;
}
