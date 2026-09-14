// RoboPlayer.js

import GameModel from "./GameModel.js";
import Player from "./Player.js";

export default class RoboPlayer {
  history = [];
  controller;

  constructor(ctrl) {
    this.controller = ctrl;
    this.makeAMove = this.makeAMove.bind(this);    
  }

  makeAMove() {
    let [row, col] = this.pickACell();
    console.log("" + row + ", " + col);
    let result = this.controller.playerMove(row, col);
    return result;
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
