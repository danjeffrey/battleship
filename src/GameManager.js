// GameManager.js

import GameRenderer from "./GameRenderer.js";

export default class GameManager {
  player1 = null;
  player2 = null;
  currentPlayer;
  gameRenderer;
  weHaveAWinner = false;

  constructor(plyr1, plyr2, renderer) {
    this.player1 = plyr1;
    this.player2 = plyr2;
    this.currentPlayer = this.player1;
    this.gameRenderer = renderer;
    renderer.gameManager = this;
  }

  isReady() {
    return this.player1 !== null && this.player2 !== null;
  }

  playerMove(row, col) {
    let result = "miss";
    let hit = false;
    let activeBoard;
    this.weHaveAWinner = false;

    if (this.currentPlayer.id === 1) {
      activeBoard = this.player2.gameBoard;
    } else {
      activeBoard = this.player1.gameBoard;
    }
    hit = activeBoard.receiveAttack(row, col);
    if (hit) {
      result = "hit";
      this.currentPlayer.hits += 1;
      this.weHaveAWinner = activeBoard.allShipsSunk();
    } else {
      result = "miss";
      this.currentPlayer.misses += 1;
      this.changePlayers();
    }
    if (this.weHaveAWinner) {
      this.currentPlayer.hasWon = true;
      this.currentPlayer.wins += 1;
      if (this.currentPlayer === this.player1) {
        this.player2.losses += 1;
      } else {
        this.player1.losses += 1;
      }
    }
    this.gameRenderer.renderGame();
  }

  changePlayers() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  newGame() {
    // Clear out hits, misses, etc.
    this.currentPlayer = this.player1;

    this.player1.hits = 0;
    this.player1.misses = 0;
    this.player1.gameBoard.clear();

    this.player2.hits = 0;
    this.player2.misses = 0;
    this.player2.gameBoard.clear();

    this.gameRenderer.renderGame();
  }
}
