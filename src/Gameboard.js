// getGameboardFactory.js
"use strict";
import Ship from "./Ship.js";

export default class Gameboard {
  rows = [...Array(10)].map((_, i) => i + 1); // 1–10
  cols = [...Array(10)].map((_, i) => i + 1); // 1–10
  // String.fromCharCode(65 + i)); // A–J
  grid = {};
  ships = []; // a list of ship instances

  constructor() {
    for (const r of this.rows) {
      this.grid[r] = {};
      for (const c of this.cols) {
        this.grid[r][c] = -1; // initialize however you want
      }
    }
  }

  placeShip(length, row, col, direction) {
    const ship = new Ship(length);
    this.ships.push(ship);
    let idx = this.ships.length - 1;
    this.grid[row][col] = idx;
    for (let step = 1; step < length; step++) {
      if (direction === "V") {
        this.grid[row + step][col] = idx;
      } else if (direction === "H") {
        this.grid[row][col + step] = idx;
      }
    }
    return this;
  }

  receiveAttack(row, col) {
    let result = false;
    if ( this.grid[row][col] !== -1 ) {
        // get ship instance and call hit() on it.
        let idx = this.grid[row][col];
        (this.ships[idx]).hit();
        result = true;
    }
    return result;
  }
}
