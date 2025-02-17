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
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  shiftCharacter(char, shift, isEncrypting) {
    const charCode = char.charCodeAt(0);
    const baseCode = char === char.toLowerCase() ? 97 : 65;

    const shiftValue = isEncrypting
      ? (charCode - baseCode + shift) % 26
      : (charCode - baseCode - shift + 26) % 26;

    return String.fromCharCode(baseCode + shiftValue);
  }

  encrypt(message, key) {
    if (typeof message !== 'string' || typeof key !== 'string' || !message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (/[A-Z]/.test(char)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        encryptedMessage += this.shiftCharacter(char, shift, true);
        keyIndex++;
      } else {
        encryptedMessage += char;
      }
    }

    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(message, key) {
    if (typeof message !== 'string' || typeof key !== 'string' || !message || !key) {
      throw new Error('Incorrect arguments!');
    }
    message = message.toUpperCase();
    key = key.toUpperCase();

    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (/[A-Z]/.test(char)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        decryptedMessage += this.shiftCharacter(char, shift, false);
        keyIndex++;
      } else {
        decryptedMessage += char;
      }
    }

    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
