// Player.test.js
"use strict";
import Player from "../src/Player.js";

it("new Player", () => {
  expect(new Player(true, "Joe Schmoe").name).toEqual("Joe Schmoe");
});

it("new Player is real", () => {
  expect(new Player(true, "Joe Schmoe").isReal).toBe(true);
});

it("new Player is bot", () => {
  expect(new Player(false, "Joe Schmoe").isReal).toBe(false);
});




