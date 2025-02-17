const { NotImplementedError } = require('../extensions/index.js');

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
function deleteDigit(n) {
  n = n.toString().split('');
  let max = 0;
  for (let i = 0; i < n.length; i++) {
    let temp = n.slice();
    temp.splice(i, 1);
    temp = parseInt(temp.join(''));
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

module.exports = {
  deleteDigit
};
