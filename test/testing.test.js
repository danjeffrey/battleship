// test/testing.test.js
"use strict";

import {
  capitalize,
  reverseString,
  Calculator,
  analyzeArray,
  caesarCipher,
} from "../src/testing.js";

it("Capitalize sentence case", () => {
  expect(capitalize("sentence case.")).toBe("Sentence case.");
});

it("reverse string", () => {
  expect(reverseString("the tall thin man")).toBe("nam niht llat eht");
});

it("Calculator add", () => {
  expect(Calculator.add(1, 2)).toBe(3);
});

it("Calculator subtract", () => {
  expect(Calculator.subtract(1, 2)).toBe(-1);
});

it("Calculator multiply", () => {
  expect(Calculator.multiply(1, 2)).toBe(2);
});

it("Calculator divide", () => {
  expect(Calculator.divide(1, 2)).toBe(0.5);
});

it("array analysis", () => {
  expect(analyzeArray([1, 2, 3, 4, 5])).toStrictEqual({
    average: 3,
    min: 1,
    max: 5,
    length: 5,
  });
});

it("Caesar cypher wraps z to a", () => {
  expect(caesarCipher("xyz", 3)).toStrictEqual("abc");
});

it("Caesar cypher Hello", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

it("Caesar cypher Hello World", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
