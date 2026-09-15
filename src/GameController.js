// GameController.js

import RoboPlayer from "./RoboPlayer.js";

export default class GameController {
  model;
  view;
  boardDivPlayer1;
  boardDivPlayer2;
  roboPlayer = null;

  constructor(gameModel, gameView) {
    this.model = gameModel;
    this.view = gameView;

    this.boardDivPlayer1 = document.getElementById("gameBoard1");
    this.boardDivPlayer1.addEventListener(
      "click",
      this.handlePlayerClick.bind(this),
    );
    this.boardDivPlayer2 = document.getElementById("gameBoard2");
    this.boardDivPlayer2.addEventListener(
      "click",
      this.handlePlayerClick.bind(this),
    );

    if (this.model.player1.isBot) {
      this.roboPlayer = new RoboPlayer(1, this);
    } else if (this.model.player2.isBot) {
      this.roboPlayer = new RoboPlayer(2, this);
    }

    this.setUpButtons();

    document.addEventListener("makeAnotherMove", this.roboMove.bind(this));
  }

  setUpButtons() {
    let player1Edit = document.getElementById("player1Edit");
    player1Edit.addEventListener("click", this.model.player1.editPlayer);

    let player2Edit = document.getElementById("player2Edit");
    player2Edit.addEventListener("click", this.model.player2.editPlayer);

    // let player2Go = document.getElementById("player2Go");
    // player2Go.addEventListener("click", this.roboPlayer.makeAMove);

    let btnNewGame = document.getElementById("btnNewGame");
    btnNewGame.addEventListener("click", this.newGame);
  }

  handlePlayerClick(event) {
    if (!this.model.weHaveAWinner) {
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

  playerMove(row, col) {
    let hit = false;
    this.weHaveAWinner = false;
    let activeBoard = this.model.getActiveBoard();
    hit = activeBoard.receiveAttack(row, col);
    let result = this.model.processHitOrMiss(activeBoard, hit);
    if (result === "miss") {
      this.changePlayers();
    }
    this.view.renderGame();
    return hit;
  }

  changePlayers() {
    this.model.changePlayers();
    if (
      this.model.currentPlayer.isBot &&
      this.model.currentPlayer.id === this.roboPlayer.id
    ) {
      const evt = new CustomEvent("makeAnotherMove", { bubbles: false });
      setTimeout(() => document.dispatchEvent(evt), 0);
    }
  }

  roboMove(evt) {
    this.roboPlayer.makeAMove();
  }

  newGame() {
    this.model.resetGame();
    this.view.renderGame();
  }
}
