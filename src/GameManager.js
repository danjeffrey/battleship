// GameManager.js

import Player from "./Player.js";

export default class GameManager {
  player1 = null;
  player2 = null;

  constructor(plyr1, plyr2) {
    this.player1 = plyr1;
    this.player2 = plyr2;
  }

  ready() {
    return this.player1 !== null && this.player2 !== null;
  }

}
