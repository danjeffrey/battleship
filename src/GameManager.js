// GameManager.js

import Player from "./Player.js";
//import GameBoard from "./GameBoard.js";
//import GameManager from "./GameManager.js";

export default class GameManager {
  player1 = null;
  player2 = null;
  currentPlayer;

  constructor(plyr1, plyr2) {
    this.player1 = plyr1;
    this.player2 = plyr2;
    this.currentPlayer = this.player1;
  }

  isReady() {
    return this.player1 !== null && this.player2 !== null;
  }

  playerMove(row, col) {
    let result = "miss";
    let hit = false;

    if (this.currentPlayer === this.player1) {
      hit = this.player2.gameBoard.receiveAttack(row, col);
    } else {
      hit = this.player1.gameBoard.receiveAttack(row, col);
    }
    if (hit) {
      result = "hit";
    } else {
      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
    return result;
  }
}

