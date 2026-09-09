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
    if (weHaveAWinner) {
      this.winningPlayer = this.currentPlayer;
      this.winningPlayer.wins += 1;
      if (this.winningPlayer === this.player1) {
        this.player2.losses += 1;
      } else {
        this.player1.losses += 1;
      }
    }
    return result;
  }

  changePlayers() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  newGame() {
    // Clear out hits, misses, etc.
    this.currentPlayer = this.player1;
    this.winningPlayer = null;

    this.player1.hits = 0;
    this.player1.misses = 0;
    this.player1.gameBoard.clear();

    this.player2.hits = 0;
    this.player2.misses = 0;
    this.player2.gameBoard.clear();
  }
}
