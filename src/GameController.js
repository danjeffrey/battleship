// GameController.js

import RoboPlayer from "./RoboPlayer.js";

export default class GameController {
  #model;
  #gameOver;
  #view;
  #roboPlayer = null;

  constructor(gameModel, gameView) {
    this.#model = gameModel;
    this.#view = gameView;

    if (this.#model.player1.isBot) {
      this.#roboPlayer = new RoboPlayer(1, this);
    } else if (this.#model.player2.isBot) {
      this.#roboPlayer = new RoboPlayer(2, this);
    }

    // This can not be called in #setupListeners because it does not
    // bind to a DOM element and many listeners will be creatd for
    // each single event.
    document.addEventListener("makeAnotherMove", this.#roboMove.bind(this));

    this.#renderGame();
  }

  playerMove(row, col) {
    let hit = false;
    let activeBoard = this.#model.getActiveBoard();
    hit = activeBoard.receiveAttack(row, col);
    let result = this.#model.processHitOrMiss(activeBoard, hit);
    this.#gameOver = this.#model.weHaveAWinner;
    if (! this.#gameOver) {
      if (result === "miss") {
        this.changePlayers();
      }
    }
    this.#renderGame();
    return hit;
  }

  changePlayers() {
    this.#model.changePlayers();

    if (
      this.#model.currentPlayer.isBot &&
      this.#model.currentPlayer.id === this.#roboPlayer.id
    ) {
      const evt = new CustomEvent("makeAnotherMove", { bubbles: false });
      setTimeout(() => document.dispatchEvent(evt), 0);
    }
  }

  // #####################################################################
  // ## Private methods:

  #renderGame() {
    this.#view.renderGame();
    this.#setUpListeners();
  }

  #setUpListeners() {
    this.#view.divBoardOpponent.addEventListener(
      "click",
      this.#handlePlayerClick.bind(this),
    );

    let player1Edit = document.getElementById("player1Edit");
    if (player1Edit) {
      player1Edit.addEventListener("click", this.#model.player1.editPlayer);
    }

    let player2Edit = document.getElementById("player2Edit");
    if (player2Edit) {
      player2Edit.addEventListener("click", this.#model.player2.editPlayer);
    }

    let btnNewGame = document.getElementById("btnNewGame");
    btnNewGame.addEventListener("click", this.#newGame.bind(this));
  }

  #handlePlayerClick(event) {
    if (!this.#gameOver) {
      // cell id looks like this: cell[6][8]
      const cell = event.target;
      if (cell.classList.contains("cell")) {
        const [row, col] = cell.id.match(/\d+/g).map(Number);
        // Note that controller.playerMove() will change the
        // current player when there is a miss:
        this.playerMove(row, col);
      }
    }
  }

  #newGame() {
    this.#model.resetGame();  
    this.#gameOver = false;  
    this.#renderGame();
  }

  #roboMove(evt) {
    this.#roboPlayer.makeAMove();
  }
}
