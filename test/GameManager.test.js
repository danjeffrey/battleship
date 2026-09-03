//GameManager.test.js
"use strict";
import GameBoard from "../src/GameBoard.js";
import GameManager from "../src/GameManager.js";
import Player from "../src/Player.js";

it("receiveAttack() hit", () => {
  expect(
    (() => {
      const board = new GameBoard();
      board.placeShip(4, 4, 2, "V");
      return board.receiveAttack(4, 2);
    })(),
  ).toBe(true);
});

it("receiveAttack() hit", () => {
  expect(
    (() => {
      const mgr = new GameManager(
        new Player(true, "Joe Schmoe"),
        new Player(false, "BotMan"),
      );
      return mgr.ready();
    })(),
  ).toBe(true);
});

it("new Game with player boards", () => {
  expect(
    (() => {
      const player1 = new Player(true, "Me");
      player1.placeAllShips();
      const player2 = new Player(false, "bot");
      player2.placeAllShips();
      const mgr = new GameManager(player1, player2);
      return (
        player1.gameBoard.receiveAttack(3, 1) &&
        player2.gameBoard.receiveAttack(3, 1)
      );
    })(),
  ).toBe(true);
});
