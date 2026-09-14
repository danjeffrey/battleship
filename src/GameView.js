// GameView.js

export default class GameView {
  model;
  playerTitles = [];
  playerAlerts = [];
  playerBoardDivs = [];
  stats = [];

  constructor(mdl) {
    this.model = mdl;

    this.playerTitles[0] = document.getElementById("player1Title");
    this.playerTitles[1] = document.getElementById("player2Title");

    this.playerAlerts[0] = document.getElementById("player1Alert");
    this.playerAlerts[1] = document.getElementById("player2Alert");

    this.playerBoardDivs[0] = document.getElementById("gameBoard1");
    this.playerBoardDivs[1] = document.getElementById("gameBoard2");

    this.stats[0] = document.getElementById("stats1");
    this.stats[1] = document.getElementById("stats2");
  }

  renderGame() {
    this.playerAlerts[0].textContent = "";
    this.playerAlerts[1].textContent = "";

    this.renderPlayer(this.model.player1);
    this.renderPlayer(this.model.player2);

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
    if (!this.model.weHaveAWinner) {
      // Who's turn is it?
      if (this.model.currentPlayer === this.model.player1) {
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

}
