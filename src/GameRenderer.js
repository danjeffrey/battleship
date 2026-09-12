// GameRenderer.js

export default class GameRenderer {
  gameManager;
  playerTitles = [];
  playerAlerts = [];
  playerBoardDivs = [];
  stats = [];

  constructor() {
    this.setUpButtons();
    this.playerTitles[0] = document.getElementById("player1Title");
    this.playerTitles[1] = document.getElementById("player2Title");

    this.playerAlerts[0] = document.getElementById("player1Alert");
    this.playerAlerts[1] = document.getElementById("player2Alert");

    this.playerBoardDivs[0] = document.getElementById("gameBoard1");
    this.playerBoardDivs[0].addEventListener(
      "click",
      this.handlePlayerClick.bind(this),
    );
    this.playerBoardDivs[1] = document.getElementById("gameBoard2");
    this.playerBoardDivs[1].addEventListener(
      "click",
      this.handlePlayerClick.bind(this),
    );

    this.stats[0] = document.getElementById("stats1");
    this.stats[1] = document.getElementById("stats2");
  }

  setUpButtons() {
    let player1Edit = document.getElementById("player1Edit");
    player1Edit.addEventListener("click", player1.editPlayer);
    let player2Edit = document.getElementById("player2Edit");
    player2Edit.addEventListener("click", player2.editPlayer);

    let btnNewGame = document.getElementById("btnNewGame");
    btnNewGame.addEventListener("click", this.newGame.bind(this));
  }

  renderGame() {
    this.playerAlerts[0].textContent = "";
    this.playerAlerts[1].textContent = "";

    this.renderPlayer(this.gameManager.player1);
    this.renderPlayer(this.gameManager.player2);

    this.renderWhoseTurn();
  }

  renderPlayer(player) {
    this.renderGameBoard(player);
    this.renderPlayerHeader(player);
    this.renderPlayerStats(player);
  }

  renderPlayerHeader(player) {
    const titleID = "player" + player.id + "Title";
    const divPlayerTitle = document.getElementById(titleID);
    divPlayerTitle.textContent = player.name;

    if (player.hasWon) {
      if (player.id === 1) {
        this.playerAlerts[0].textContent = "Winner!";
      } else {
        this.playerAlerts[1].textContent = "Winner!";
      }
    }
  }

  renderGameBoard(player) {
    let divGameBoard;
    divGameBoard = this.playerBoardDivs[player.id - 1];
    this.renderCells(player, divGameBoard);
  }

  renderCells(player, divBoard) {
    // Clear the board first:
    divBoard.innerHTML = "";
    const gameBoard = player.gameBoard;
    const hitSet = new Set(gameBoard.hits.map((h) => `${h.row},${h.col}`));
    const missSet = new Set(gameBoard.misses.map((h) => `${h.row},${h.col}`));
    gameBoard.rows.forEach(function (row) {
      gameBoard.cols.forEach(function (col) {
        //console.log("row: " + row + "   col: " + col);
        const cell = document.createElement("div");
        divBoard.appendChild(cell);
        cell.id = "cell[" + row + "][" + col + "]";
        cell.classList.add("cell");
        const key = `${row},${col}`;
        if (row === 1 && col === 1) {
          console.log("gameBoard.hits[0] for " + player.name + ":");
          console.log(gameBoard.hits[0]);
          console.log("{ row, col }: ");
          console.log({ row, col });
          console.log(hitSet.has(key));
        }
        if (hitSet.has(key)) {
          cell.textContent = "X";
          cell.classList.add("hit");
        } else if (missSet.has(key)) {
          cell.textContent = "-";
          cell.classList.add("miss");
        }
      });
    });
  }

  renderPlayerStats(player) {
    let strStats =
      "" +
      player.hits +
      " hits, " +
      player.misses +
      " misses [" +
      player.wins +
      "-" +
      player.losses +
      "]";
    if (player.id === 1) {
      this.stats[0].textContent = strStats;
    } else {
      this.stats[1].textContent = strStats;
    }
  }

  renderWhoseTurn() {
    if (!this.gameManager.weHaveAWinner) {
      // Who's turn is it?
      if (this.gameManager.currentPlayer === this.gameManager.player1) {
        this.playerAlerts[0].textContent = "Your turn!";
        if (this.playerBoardDivs[1].classList.contains("frozen")) {
          this.playerBoardDivs[1].classList.remove("frozen");
        }
        if (!this.playerBoardDivs[0].classList.contains("frozen")) {
          this.playerBoardDivs[0].classList.add("frozen");
        }
      } else {
        this.playerAlerts[1].textContent = "Your turn!";
        if (this.playerBoardDivs[0].classList.contains("frozen")) {
          this.playerBoardDivs[0].classList.remove("frozen");
        }
        if (!this.playerBoardDivs[1].classList.contains("frozen")) {
          this.playerBoardDivs[1].classList.add("frozen");
        }
      }
    }
  }

  handlePlayerClick(event) {
    if (!this.gameManager.weHaveAWinner) {
      // cell id looks like this: cell[6][8]
      const cell = event.target;
      if (cell.classList.contains("cell")) {
        const [row, col] = cell.id.match(/\d+/g).map(Number);
        // Note that playerMove() changes the current player:
        this.gameManager.playerMove(row, col);
      }
    }
  }

  newGame() {
    this.gameManager.newGame();
    this.renderGame();
    this.playerBoardDivs[1].classList.remove("frozen");
    this.playerBoardDivs[0].classList.add("frozen");
  }
}
