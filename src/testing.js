// src/testing.js
"use strict"

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

class Calculator {
  static add(a, b) {
    return a + b;
  }
  static subtract(a, b) {
    return a - b;
  }
  static multiply(a, b) {
    return a * b;
  }
  static divide(a, b) {
    return a / b;
  }
}

function analyzeArray(numbers) {
  const len = numbers.length;
  const mean = numbers.reduce((sum, n) => sum + n, 0) / len;
  const minimum = numbers.reduce((m, n) => (n < m ? n : m), Infinity);
  const maximum = numbers.reduce((m, n) => (n > m ? n : m), -Infinity);
  return {
    average: mean,
    min: minimum,
    max: maximum,
    length: len,
  };
}

function caesarCipher(strInput, shiftFactor) {
  // Normalize the shift to stay within 0–25
  const shift = shiftFactor % 26;

  let result = "";

  for (let char of strInput) {
    // Uppercase A–Z
    if (char >= "A" && char <= "Z") {
      const code = char.charCodeAt(0) - 65;
      const shifted = (code + shift + 26) % 26; 
      result += String.fromCharCode(shifted + 65);
    }
    // Lowercase a–z
    else if (char >= "a" && char <= "z") {
      const code = char.charCodeAt(0) - 97;
      const shifted = (code + shift + 26) % 26;
      result += String.fromCharCode(shifted + 97);
    }
    // Non‑letters stay the same
    else {
      result += char;
    }
  }

  return result;
}

export { capitalize, reverseString, Calculator, analyzeArray, caesarCipher};
