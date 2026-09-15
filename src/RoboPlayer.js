// RoboPlayer.js

import GameModel from "./GameModel.js";
import Player from "./Player.js";

export default class RoboPlayer {
  history = [];
  controller;
  id = 0;

  constructor(idx, ctrl) {
    this.controller = ctrl;
    this.makeAMove = this.makeAMove.bind(this);
    this.id = idx;
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async makeAMove() {
    await this.sleep(300);
    let [row, col] = this.pickACell();
    console.log("" + row + ", " + col);
    let hit = this.controller.playerMove(row, col);
    if (hit) {
      const evt = new CustomEvent("makeAnotherMove", { bubbles: false });
      setTimeout(() => document.dispatchEvent(evt), 0);
    }
    return hit;
  }

  test() {
    return 23;
  }

  pickACell() {
    let row = Math.floor(Math.random() * 10) + 1;
    let col = Math.floor(Math.random() * 10) + 1;
    let result = [row, col];
    // Randomly pick a cell that has not been picked before.
    while (this.history.some(([r, c]) => r === row && c === col)) {
      row = Math.floor(Math.random() * 10) + 1;
      col = Math.floor(Math.random() * 10) + 1;
      result = [row, col];
    }
    this.history.push(result);
    return result;
  }
}
