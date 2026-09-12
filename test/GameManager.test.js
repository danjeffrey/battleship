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

it("manager is ready", () => {
  expect(
    (() => {
      const mgr = new GameManager(
        new Player(false, "Joe Schmoe", 1),
        new Player(true, "BotMan", 2),
        null
      );
      return mgr.isReady();
    })(),
  ).toBe(true);
});

it("new Game with player boards", () => {
  expect(
    (() => {
      const player1 = new Player(false, "Me", 1);
      player1.placeAllShips();
      const player2 = new Player(true, "bot", 2);
      player2.placeAllShips();
      const mgr = new GameManager(player1, player2, null);
      return (
        player1.gameBoard.receiveAttack(3, 1) &&
        player2.gameBoard.receiveAttack(3, 1)
      );
    })(),
  ).toBe(true);
});
