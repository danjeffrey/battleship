// GameBoard.test.js
"use strict";
import Ship from "./Ship.js";

export default class GameBoard {
  #totalPossibleHits = 0;
  rows = [...Array(10)].map((_, i) => i + 1); // 1–10
  cols = [...Array(10)].map((_, i) => i + 1); // 1–10
  grid = {};
  ships = []; // a list of ship instances

  constructor() {
    for (const r of this.rows) {
      this.grid[r] = {};
      for (const c of this.cols) {
        this.grid[r][c] = "-1|0"; // initialize
      }
    }
  }

  // Find out if this is a hit. If it is, change the
  // call hit on the ship and add the cell o the array
  // of hits.
  receiveAttack(row, col) {
    let result = 0; // 0 = miss, 1 = hit, 2 = miss
    if (!row || !col || row < 1 || row > 10 || col < 1 || col > 10) {
      console.log("Bad coordinates in receiveAttack(" + row + "," + col + "]");
    }
    let value = this.grid[row][col];
    let [idx, clicked] = value.split("|");
    if (+clicked !== 0) {
      result = 0;
    } else if (idx !== undefined) {
      if (idx > -1) {
        // This is a hit
        // get ship instance and call hit() on it.
        this.ships[idx].hit();
        result = 1;
      } else {
        // This is a miss:
        // get ship instance and call miss() on it.
        result = 2;
      }
      // mark the cell as clicked:
      this.grid[row][col] = "" + idx + "|1";
    }
    return result;
  }

  // Find out if this is a hit, but do nothing if
  // it is a hit.
  testAttack(row, col) {
    let hit = false;
    let value = this.grid[row][col];
    let [idx, clicked] = value.split("|");
    if (idx > -1) {
      hit = true;
    }
    return hit;
  }

  allShipsSunk() {
    let result = true;
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  }

  clear() {
    this.ships = [];
    for (const r of this.rows) {
      this.grid[r] = {};
      for (const c of this.cols) {
        this.grid[r][c] = "-1|0"; // initialize
      }
    }
  }

  isReady() {
    let ones = 0;
    let twos = 0;
    let threes = 0;
    let fours = 0;
    //console.log(this.ships.length);
    if (this.ships.length != 10) {
      return false;
    }
    for (let i = 0; i < this.ships.length; i++) {
      switch (this.ships[i].size) {
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
    if (ones != 4 || twos != 3 || threes != 2 || fours != 1) {
      return false;
    }
    return true;
  }

  placeShip(size, first = false) {
    const ship = new Ship(size);
    this.ships.push(ship);
    let idx = this.ships.length - 1;

    const direction = Math.random() < 0.5 ? "H" : "V";

    let [row, col] = [0, 0];
    if (first) {
      //the first-placed ship will have no collisions
      [row, col] = this.#pickACellForPlacement(size, direction);
    } else {
      let collision = false;
      do {
        [row, col] = this.#pickACellForPlacement(size, direction);
        collision = this.#checkIntersectsShip(row, col, size, direction);
      } while (collision);
    }

    this.grid[row][col] = "" + idx + "|0";
    for (let step = 1; step < size; step++) {
      if (direction === "V") {
        this.grid[row + step][col] = "" + idx + "|0";
      } else if (direction === "H") {
        this.grid[row][col + step] = "" + idx + "|0";
      }
    }

    this.#totalPossibleHits += size;
    return this;
  }

  debugShipPlacement() {
    let ctr = 0;
    let rowStrings = [];
    for (let r = 1; r < 11; r++) {
      let rowString = "";
      for (let c = 1; c < 11; c++) {
        let value = this.grid[r][c];
        let [idx, clicked] = value.split("|");
        rowString = rowString + (idx < 0 ? "    " : " " + idx);
        if (+idx > -1) {
          ctr++;
        }
      }
      rowStrings.push(rowString);
    }
    if (ctr != 20) {
      console.log("Ship placement total cells: " + ctr);
      rowStrings.forEach(function (rowString) {
        console.log("   " + rowString);
      });
    }
  }

  getCellValues(row, col) {
    // let isShip = -1;
    let wasClicked = false;
    let val = this.grid[row][col];
    let [ship, clicked] = val.split("|");
    // if (ship > -1) {
    //   isShip = true;
    // }
    if (clicked != 0) {
      wasClicked = true;
    }
    return [ship, wasClicked];
  }

  // ################################################################
  // ## Private Methods:

  #pickACellForPlacement(shipSize, direction) {
    let col = 0;
    let row = 0;
    if (direction === "V") {
      row = Math.floor(Math.random() * (10 - shipSize)) + 1;
      col = Math.floor(Math.random() * 10) + 1;
    } else if (direction === "H") {
      row = Math.floor(Math.random() * 10) + 1;
      col = Math.floor(Math.random() * (10 - shipSize)) + 1;
    }
    return [row, col];
  }

  // See if the chosen location overlaps a ship that was
  // previously placed.
  #checkIntersectsShip(row, col, shipSize, direction) {
    let overlapsShip = false;
    if (direction === "V") {
      for (let r = row; r - row + 1 <= shipSize; r++) {
        if (this.testAttack(r, col)) {
          overlapsShip = true;
          break;
        }
        // else: keep looping
      }
    } else if (direction === "H") {
      for (let c = col; c - col + 1 <= shipSize; c++) {
        if (this.testAttack(row, c)) {
          overlapsShip = true;
          break;
        }
      }
    }
    return overlapsShip;
  }
}
