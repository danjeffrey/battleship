// GameRenderer.js

export default class GameRenderer {
  gameManager;
  player1Title;
  player2Title;

  constructor(mgr) {
    this.gameManager = mgr;
    this.manageButtons();
  }

  manageButtons() {
    this.player1Title = document.getElementById("player1Title");
    this.player2Title = document.getElementById("player2Title");
    let player1Edit = document.getElementById("player1Edit");
    let player2Edit = document.getElementById("player2Edit");
    player1Edit.addEventListener('click', this.editPlayer.bind(this));
    player2Edit.addEventListener('click', this.editPlayer.bind(this));
  }
  
  editPlayer(event) {
    const newValue = prompt("Enter a name:");
    console.log("You entered:", newValue);
    const btn = event.target;
    if ( btn.id.includes("1") ) {
      this.gameManager.player1.name = newValue;
      this.player1Title.textContent = newValue;
    } else {
      this.gameManager.player2.name = newValue;
      this.player2Title.textContent = newValue;
    }
  }

  handlePlayerClick(event) {
    // cell id looks like this: cell[6][8]
    const cell = event.target;
    if (cell.classList.contains("gameBoard")) {
      // skip it. Click event has the wrong target
    } else {
      const [row, col] = cell.id.match(/\d+/g).map(Number);
      let result = this.gameManager.playerMove(row, col);
      cell.classList.add(result);
      if (result === "hit") {
        cell.textContent = "X";
      } else {
        cell.textContent = "-";
      }
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
        //console.log("row: " + row + "   col: " + col);
        const cell = document.createElement("div");
        div.appendChild(cell);
        cell.id = "cell[" + row + "][" + col + "]";
        cell.classList.add("cell");        
      });
    });
  }
}
