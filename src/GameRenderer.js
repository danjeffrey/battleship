// GameRenderer.js

export default class GameRenderer {
  gameManager;

  constructor(mgr) {
    this.gameManager = mgr;
  }

  handlePlayerClick(event) {
    // cell id looks like this: cell[6][8]
    const cell = event.target;
    const [row, col] = cell.id.match(/\d+/g).map(Number);
    let result = this.gameManager.playerMove(row, col);
    cell.classList.add(result);
    if (result === "hit") {
      cell.textContent = "X";
    } else {
      cell.textContent = "-";
    }
  }

  renderGameBoards() {
    this.renderPlayer(this.gameManager.player1, 1);
    this.renderPlayer(this.gameManager.player2, 2);
  }

  renderPlayer(player, order) {
    if (order !== 1 && order !== 2) {
      return;
    }
    this.renderPlayerTitle(player, order);
    this.renderGameBoard(player, order);
    this.renderPlayerStats(player, order);
  }

  renderPlayerTitle(player, order) {
    const titleID = "player" + order + "Title";
    const divPlayerTitle = document.getElementById(titleID);
    divPlayerTitle.textContent = player.name;
  }

  renderGameBoard(player, order) {
    const gameBoard = player.gameBoard;
    const boardID = "gameBoard" + order;
    const divGameBoard = document.getElementById(boardID);
    divGameBoard.addEventListener("click", this.handlePlayerClick.bind(this));
    this.renderCells(player, divGameBoard);
  }

  renderPlayerStats(player, order) {
    const statsID = "stats" + order;
    const divPlayerStats = document.getElementById(statsID);
    divPlayerStats.textContent = "Player " + order + " stats go here.";
  }

  renderCells(player, div) {
    const gameBoard = player.gameBoard;
    gameBoard.rows.forEach(function (row) {
      gameBoard.cols.forEach(function (col) {
        console.log("row: " + row + "   col: " + col);
        const cell = document.createElement("div");
        div.appendChild(cell);
        cell.id = "cell[" + row + "][" + col + "]";
        cell.classList.add("cell");
        // if (gameBoard.grid[row][col] !== -1) {
        //   cell.classList.add("containsShip");
        //   cell.textContent = "" + gameBoard.grid[row][col];
        // }
      });
    });
  }
}
