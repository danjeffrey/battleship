// GameManager.js

import Player from "./Player.js";

export default class GameManager {
  player1 = null;
  player2 = null;
  currentPlayer;
  winningPlayer = null;

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
    let activeBoard;
    let weHaveAWinner = false;

    if (this.currentPlayer === this.player1) {
      activeBoard = this.player2.gameBoard;
    } else {
      activeBoard = this.player1.gameBoard;
    }
    hit = activeBoard.receiveAttack(row, col);
    if (hit) {
      result = "hit";
      this.currentPlayer.hits += 1;
      weHaveAWinner = activeBoard.allShipsSunk();
    } else {
      result = "miss";
      this.currentPlayer.misses += 1;
      this.changePlayers();
    }
    if ( weHaveAWinner ) {
      this.winningPlayer = this.currentPlayer;
    }
    return result;
  }

  changePlayers() {
      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

}

