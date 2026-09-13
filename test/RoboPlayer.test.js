// RoboPlayer.test.js

"use strict";
import RoboPlayer from "../src/RoboPlayer.js";
import GameManager from "../src/GameManager.js";
import GameRenderer from "../src/GameRenderer.js";
import Player from "../src/Player.js";

it("Place holder", () => {
  expect(1).toBe(1);
});

test("returns one of two valid values", () => {
  const robo = new RoboPlayer(
    new GameManager(
      new Player("Human", false, 1),
      new Player("Bot", true, 2),
      new GameRenderer()
    ),
  );
  result = robo.makeAMove();
  const allowed = ["hit", "miss"];
  expect(allowed).toContain(result);
});
