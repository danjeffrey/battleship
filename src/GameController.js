// GameController.js

export default class GameController {
  model;
  view;
  boardDivPlayer1;
  boardDivPlayer2;

  constructor(gameModel, gameView) {
    this.model = gameModel;
    this.view = gameView;

    this.boardDivPlayer1 = document.getElementById("gameBoard1");
    this.boardDivPlayer1.addEventListener(
      "click",
      this.handlePlayerClick.bind(this)
    );
    this.boardDivPlayer2 = document.getElementById("gameBoard2");
    this.boardDivPlayer2.addEventListener(
      "click",
      this.handlePlayerClick.bind(this)
    );

    this.setUpButtons();
  }

  setUpButtons() {
    let player1Edit = document.getElementById("player1Edit");
    player1Edit.addEventListener("click", player1.editPlayer);
    let player2Edit = document.getElementById("player2Edit");
    player2Edit.addEventListener("click", player2.editPlayer);

    //let player2Go = document.getElementById("player2Go");
    //player2Go.addEventListener("click", todo);

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
  }

  changePlayers() {
    this.model.changePlayers();
    // if (this.currentPlayer.isBot) {
    //   this.currentPlayer.roboPlayer.makeAMove();
    // }
  }

  newGame() {
    this.model.resetGame();
    this.view.renderGame();
  }
}
