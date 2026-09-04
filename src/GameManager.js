// GameManager.js

import Player from "./Player.js";
//import GameBoard from "./GameBoard.js";
//import GameManager from "./GameManager.js";

export default class GameManager {
  player1 = null;
  player2 = null;
  whoGoesNext = 1;

  constructor() {}

  isReady() {
    return this.player1 !== null && this.player2 !== null;
  }

  newGame(plyr1, plyr2) {
    this.player1 = plyr1;
    this.player2 = plyr2;
  }

  playerMove(row, col) {
    let result = "miss";

    //if (activePlayer === player1) {
    let hit = this.player2.gameBoard.receiveAttack(row, col);
    if (hit) {
      result = "hit";
    }
    //}
    return result;
  }
}
