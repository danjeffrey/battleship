//Ship.test.js
"use strict";

import Ship from "../src/Ship.js";

it("Ship created unsunk", () => {
  expect(new Ship(4).isSunk()).toBe(false);
});

it("Ship hit once not sunk", () => {
  expect(new Ship(2).hit().isSunk()).toBe(false);
});

it("Ship hit twice is sunk", () => {
  expect(new Ship(2).hit().hit().isSunk()).toBe(true);
});

it("Ship length is right", () => {
  expect(new Ship(2).length).toBe(2);
});


