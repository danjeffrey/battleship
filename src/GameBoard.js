// GameBoard.test.js
"use strict";
import Ship from "./Ship.js";

export default class GameBoard {
  rows = [...Array(10)].map((_, i) => i + 1); // 1–10
  cols = [...Array(10)].map((_, i) => i + 1); // 1–10
  grid = {};
  ships = []; // a list of ship instances
  hits = [];
  misses = [];

  constructor() {
    for (const r of this.rows) {
      this.grid[r] = {};
      for (const c of this.cols) {
        this.grid[r][c] = -1; // initialize however you want
      }
    }
  }

  placeShip(size, row, col, direction) {
    const ship = new Ship(size);
    this.ships.push(ship);
    let idx = this.ships.length - 1;
    this.grid[row][col] = idx;
    for (let step = 1; step < size; step++) {
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
    if (this.grid[row][col] !== -1) {
      // get ship instance and call hit() on it.
      let idx = this.grid[row][col];
      if (idx !== undefined) {
        this.ships[idx].hit();
        result = true;
      }
      this.hits.push({ row, col });
    } else {
      this.misses.push({ row, col });
    }
    return result;
  }

  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  }

  clear() {
    for (let i = 0; i < this.ships.length; i++) {
      this.ships[i].hits = 0;
      this.ships[i].sunk = false;
    }    
    this.hits = [];
    this.misses = [];
  }

  isReady() {
    let ones = 0;
    let twos = 0;
    let threes = 0;
    let fours = 0;
    //console.log(this.ships.length);
    if ( this.ships.length != 10 ) {
      return false;
    }
    for (let i = 0; i < this.ships.length; i++) {
      switch ( this.ships[i].size ) {
        case 1:
          ones++;
          break;
        case 2:
          twos++;
          break;
        case 3:
          threes++;
          break;
        case 4:
          fours++;
          break;
        default:
          // NOOP
      }      
    }
    //console.log("" + ones + ", " + twos + ", " + threes + ", " + fours);
    if ( ones != 4 || twos != 3 || threes != 2 || fours != 1 ) {
      return false;
    }
    return true;
  }
}
