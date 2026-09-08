// Player.test.js
"use strict";
import Player from "../src/Player.js";

it("new Player", () => {
  expect(new Player(true, "Joe Schmoe").name).toEqual("Joe Schmoe");
});

it("new Player is real", () => {
  expect(new Player(false, "Joe Schmoe").isBot).toBe(false);
});

it("new Player is bot", () => {
  expect(new Player(true, "Joe Schmoe").isBot).toBe(true);
});

it("new Game with player boards", () => {
  expect(
    (() => {
      const player1 = new Player(false, "Me");
      player1.placeAllShips();
      return player1.gameBoard.receiveAttack(3, 1);
    })(),
  ).toBe(true);
});




