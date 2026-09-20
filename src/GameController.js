// GameController.js

import RoboPlayer from "./RoboPlayer.js";
import GameTypes from "./GameTypes.js";
import GamePhases from "./GamePhases.js";

export default class GameController {
  #model;
  #view;
  #roboPlayer = null;
  #gameType = GameTypes.SINGLE_PLAYER_GAME;
  #gamePhase = GamePhases.NEW_GAME;

  constructor(gameModel, gameView) {
    this.#model = gameModel;
    this.#view = gameView;

    console.log(this.#gameType);
    console.log(this.#gamePhase);

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

    this.#gamePhase = GamePhases.GAME_ON;
    this.#render();
  }

  playerMove(row, col) {
    let activeBoard = this.#model.getActiveBoard();
    // The following returns: // 0 = previously played, 1 = hit, 2 = miss
    let alreadyPlayedHitOrMiss = activeBoard.receiveAttack(row, col);
    let hit = alreadyPlayedHitOrMiss === 1;
    if (alreadyPlayedHitOrMiss > 0) {
      this.#model.processHitOrMiss(activeBoard, hit);
      if (!this.#model.weHaveAWinner) {
        if (alreadyPlayedHitOrMiss === 2) {
          this.changePlayers();
        }
      } else {
        this.gamePhase = GamePhases.GAME_OVER;
      }
      if (!this.#model.currentPlayer.isBot || this.#model.weHaveAWinner) {
        // Don't re-render the game while the bot it playing
        // but do rerender if the game is over.
        this.#render();
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

  advanceGamePhase() {
    switch (this.#gamePhase) {
      case GamePhases.NEW_GAME:
        this.#gamePhase = GamePhases.GAME_SETUP;
        break;
      case GamePhases.GAME_SETUP:
        this.#gamePhase = GamePhases.GAME_ON;
        break;
      case GamePhases.GAME_ON:
        this.#gamePhase = GamePhases.GAME_OVER;
        break;
      default:
        console.log(
          "ERROR: Cannot advance beyond GAME_OVER without starting a new game.",
        );
        break;
    }
  }

  // #####################################################################
  // ## Private methods:

  #render() {
    this.#view.render(this.#gameType, this.#gamePhase);
    this.#setUpListeners();
  }

  #setUpListeners() {    
    switch (this.#gamePhase) {
      case GamePhases.NEW_GAME:
        break;
      case GamePhases.GAME_SETUP:
        this.#enableListenerPlayerClickOwnBoard();
        break;
      case GamePhases.GAME_ON:
        this.#enableListenerPlayerClickOpponent();
        break;
      case GamePhases.GAME_OVER:
        break;
    }
  }

  #enableListenerPlayerClickOwnBoard() {
    this.#view.divBoardOpponent.addEventListener(
      "click",
      this.#handlePlayerClick.bind(this),
    );
  }

  #enableListenerPlayerClickOpponent() {
    this.#view.divBoardOpponent.addEventListener(
      "click",
      this.#handlePlayerClick.bind(this),
    );
  }

  #handlePlayerClick(event) {
    if (!this.#model.weHaveAWinner) {
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
    this.#gamePhase = GamePhases.GAME_OVER;
    this.#model.resetGame();
    this.#model.weHaveAWinner = false;
    this.#view.resetGame();
    this.#roboPlayer.clear();
    this.#gamePhase = GamePhases.GAME_ON;
    this.#render(this.#gameType, this.#gamePhase);
  }

  #roboMove(evt) {
    this.#roboPlayer.makeAMove();
  }
}
