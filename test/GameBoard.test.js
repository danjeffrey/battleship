//GameBoard.test.js
"use strict";
import GameBoard from "../src/GameBoard.js";

// it("grid for placement 4, 4, 2, V", () => {
//   expect(new GameBoard().placeShip(4, 4, 2, "V").grid).toEqual(placeShipVboard);
// });

// it("grid for placement 4, 4, 2, H", () => {
//   expect(new GameBoard().placeShip(4, 4, 2, "H").grid).toEqual(placeShipHboard);
// });

// it("receiveAttack() hit", () => {
//   expect(
//     (() => {
//       const board = new GameBoard();
//       board.placeShip(4, 4, 2, "V");
//       return board.receiveAttack(4, 2);
//     })(),
//   ).toBe(true);
// });

// it("receiveAttack() miss", () => {
//   expect(
//     (() => {
//       const board = new GameBoard();
//       board.placeShip(4, 4, 2, "H");
//       return board.receiveAttack(5, 2);
//     })(),
//   ).toBe(false);
// });

// it("receiveAttack() big miss", () => {
//   expect(
//     (() => {
//       const board = new GameBoard();
//       board.placeShip(4, 4, 2, "H");
//       return board.receiveAttack(8, 8);
//     })(),
//   ).toBe(false);
// });

it("allShipsSunk() false", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, true);
      return board.allShipsSunk();
    })(),
  ).toBe(false);
});

// it("allShipsSunk() true", () => {
//   expect(
//     (() => {
//       const board = new GameBoard();
//       board.placeShip(4, true);
//       board.receiveAttack(4, 2);
//       board.receiveAttack(4, 3);
//       board.receiveAttack(4, 4);
//       board.receiveAttack(4, 5);
//       return board.allShipsSunk();
//     })(),
//   ).toBe(true);
// });

