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

    // These next two listeners can not be called in #setupListeners
    // because they do not bind to a DOM element that will be replaced
    // when rendering the game and multiple listeners will be created for
    // each single event.
    document.addEventListener("makeAnotherMove", this.#roboMove.bind(this));
    let btnNewGame = document.getElementById("btnNewGame");
    btnNewGame.addEventListener("click", this.#newGame.bind(this));

    this.#renderGame();
  }

  playerMove(row, col) {
    let activeBoard = this.#model.getActiveBoard();
    // The following returns: // 0 = previously played, 1 = hit, 2 = miss
    let alreadyPlayedHitOrMiss = activeBoard.receiveAttack(row, col);
    let hit = alreadyPlayedHitOrMiss === 1;
    if (alreadyPlayedHitOrMiss > 0) {
      this.#model.processHitOrMiss(activeBoard, hit);
      this.#gameOver = this.#model.weHaveAWinner;
      if (!this.#gameOver) {
        if (alreadyPlayedHitOrMiss === 2) {
          this.changePlayers();
        }
      }
      if (!this.#model.currentPlayer.isBot || this.#gameOver) {
        // Don't re-render the game while the bot it playing
        this.#renderGame();
      }
    } else {
      // Do nothing. Let the player try again.
    }
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

  waitCursor(show) {
    if (show) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
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
    this.#view.resetGame();
    this.#roboPlayer.clear();
    this.#renderGame();
  }

  #roboMove(evt) {
    this.#roboPlayer.makeAMove();
  }
}
