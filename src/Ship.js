// Ship.js
"use strict";

export default class Ship {
  id;
  size;
  hits = 0;

  constructor(len) {
    this.size = len;
  }

  hit() {
    this.hits++;
    return this;
  }

  isSunk() {
    let result = false;
    if (this.hits >= this.size) {
      result = true;
    }
    return result;
  }
}
