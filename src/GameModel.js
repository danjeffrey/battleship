// GameModel.js

export default class GameModel {
  player1 = null;
  player2 = null;
  currentPlayer;
  weHaveAWinner = false;

  constructor(plyr1, plyr2) {
    this.player1 = plyr1;
    this.player2 = plyr2;
    this.currentPlayer = this.player1;
  }

  isReady() {
    return this.player1 !== null && this.player2 !== null;
  }

  getActiveBoard() {
    let activeBoard = this.player1.gameBoard;
    if (this.currentPlayer.id === 1) {
      activeBoard = this.player2.gameBoard;
    }
    return activeBoard;
  }

  processHitOrMiss(board, hit) {
    let result = "miss";
    if (hit) {
      result = "hit";
      this.currentPlayer.hits += 1;
      this.weHaveAWinner = board.allShipsSunk();
    } else {
      this.currentPlayer.misses += 1;
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
    return result;
  }

  changePlayers() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  resetGame() {
    // Clear out hits, misses, etc.
    this.currentPlayer = this.player1;

    this.player1.hits = 0;
    this.player1.misses = 0;
    this.player1.gameBoard.clear();

    this.player2.hits = 0;
    this.player2.misses = 0;
    this.player2.gameBoard.clear();
  }
}
