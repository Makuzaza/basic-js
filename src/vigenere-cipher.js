const { NotImplementedError } = require('../extensions/index.js');

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
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  shift(char, shift) {
    const code = char.charCodeAt(0);
    const shiftCode = shift.charCodeAt(0) - 65;
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shiftCode) % 26) + 65);
    } else {
      return char;
    }
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    const result = [];
    let j = 0;
    for (let i = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/i)) {
        result.push(this.shift(message[i].toUpperCase(), key[j % key.length].toUpperCase()));
        j++;
      } else {
        result.push(message[i]);
      }
    }
    return this.direct ? result.join('') : result.reverse().join('');

  }
  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    const result = [];
    let j = 0;
    for (let i = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/i)) {
        result.push(this.shift(message[i].toUpperCase(), -key[j % key.length].toUpperCase()));
        j++;
      } else {
        result.push(message[i]);
      }
    }
    return this.direct ? result.join('') : result.reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
