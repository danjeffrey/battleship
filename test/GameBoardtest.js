//GameBoard.test.js
"use strict";
import GameBoard from "../src/GameBoard.js";

it("grid for placement 4, 4, 2, V", () => {
  expect(new GameBoard().placeShip(4, 4, 2, "V").grid).toEqual(placeShipVboard);
});

it("grid for placement 4, 4, 2, H", () => {
  expect(new GameBoard().placeShip(4, 4, 2, "H").grid).toEqual(placeShipHboard);
});

it("receiveAttack() hit", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "V");
      return board.receiveAttack(4, 2);
    })(),
  ).toBe(true);
});

it("receiveAttack() miss", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "H");
      return board.receiveAttack(5, 2);
    })(),
  ).toBe(false);
});

it("receiveAttack() big miss", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "H");
      return board.receiveAttack(8, 8);
    })(),
  ).toBe(false);
});

it("allShipsSunk() false", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "H");
      return board.allShipsSunk()
    })(),
  ).toBe(false);
});

it("allShipsSunk() true", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "H");
      board.receiveAttack(4, 2);
      board.receiveAttack(4, 3);
      board.receiveAttack(4, 4);
      board.receiveAttack(4, 5);
      return board.allShipsSunk()
    })(),
  ).toBe(true);
});


const placeShipVboard = {
  1: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  2: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  3: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  4: {
    1: -1,
    2: 0,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  5: {
    1: -1,
    2: 0,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  6: {
    1: -1,
    2: 0,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  7: {
    1: -1,
    2: 0,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  8: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  9: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  10: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
};

const placeShipHboard = {
  1: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  2: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  3: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  4: {
    1: -1,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  5: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  6: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  7: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  8: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  9: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
  10: {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
  },
};
