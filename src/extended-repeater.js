const { NotImplementedError } = require('../extensions/index.js');

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
function repeater(str, options) {
  let { repeatTimes, separator, addition, additionRepeatTimes, additionSeparator } = options;
  let result = '';
  if (repeatTimes === undefined) repeatTimes = 1;
  if (separator === undefined) separator = '+';
  if (addition === undefined) addition = '';
  if (additionRepeatTimes === undefined) additionRepeatTimes = 1;
  if (additionSeparator === undefined) additionSeparator = '|';
  for (let i = 0; i < repeatTimes; i++) {
    result += str;
    for (let j = 0; j < additionRepeatTimes; j++) {
      result += addition;
      if (j < additionRepeatTimes - 1) result += additionSeparator;
    }
    if (i < repeatTimes - 1) result += separator;
  }
  return result;
}

module.exports = {
  repeater
};
