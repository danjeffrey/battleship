// Player.test.js
"use strict";
import Player from "../src/Player.js";

it("new Player", () => {
  expect(new Player(true, "Joe Schmoe", 1).name).toEqual("Joe Schmoe");
});

it("new Player is real", () => {
  expect(new Player(false, "Joe Schmoe", 1).isBot).toBe(false);
});

it("new Player is bot", () => {
  expect(new Player(true, "Joe Schmoe", 1).isBot).toBe(true);
});

it("new Game with player boards", () => {
  expect(
    (() => {
      const player1 = new Player(false, "Me", 1);
      player1.placeAllShips();
      return player1.gameBoard.receiveAttack(3, 1);
    })(),
  ).toBe(true);
});

it("new Player id is 1", () => {
  expect(new Player(true, "Joe Schmoe", 1).id).toBe(1);
});

it("new Player id is 2", () => {
  expect(new Player(true, "Joe Schmoe", 2).id).toBe(2);
});

it("Player has won", () => {
  expect(
    (() => {
      const player = new Player(false, "Me", 1);
      player.hasWon = true;
      return player.hasWon;
    })(),
  ).toBe(true);
});




