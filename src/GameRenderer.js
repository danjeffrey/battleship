// GameRenderer.js

export default class GameRenderer {
  gameManager;
  player1Title;
  player2Title;
  player1Alert;
  player2Alert;
  player1BoardDiv;
  player2BoardDiv;
  stats1;
  stats2;

  constructor(mgr) {
    this.gameManager = mgr;
    this.manageButtons();
    this.player1Title = document.getElementById("player1Title");
    this.player2Title = document.getElementById("player2Title");
  
    this.player1Alert = document.getElementById("player1Alert");
    this.player2Alert = document.getElementById("player2Alert");
    this.player1Alert.textContent = "It's you're turn!";
    this.player2Alert.textContent = "";
    
    this.player1BoardDiv = document.getElementById("gameBoard1");
    this.player1BoardDiv.addEventListener('click', this.handlePlayerClick.bind(this));
    this.player2BoardDiv = document.getElementById("gameBoard2");
    this.player2BoardDiv.addEventListener('click', this.handlePlayerClick.bind(this));
  
    this.stats1 = document.getElementById("stats1");
    this.stats2 = document.getElementById("stats2");
  }    

  manageButtons() {
    let player1Edit = document.getElementById("player1Edit");
    let player2Edit = document.getElementById("player2Edit");
    player1Edit.addEventListener("click", this.editPlayer.bind(this));
    player2Edit.addEventListener("click", this.editPlayer.bind(this));

    let btnNewGame = document.getElementById("btnNewGame");
    btnNewGame.addEventListener("click", this.newGame.bind(this));
  }

  editPlayer(event) {
    const newValue = prompt("Enter a name:");
    console.log("You entered:", newValue);
    const btn = event.target;
    if (btn.id.includes("1")) {
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
    if (cell.classList.contains("cell")) {
      const [row, col] = cell.id.match(/\d+/g).map(Number);
      // Save the active player so we can update the stats for that player:
      const lastPlayer = this.gameManager.currentPlayer;
      // playerMove() changes the current player.
      let result = this.gameManager.playerMove(row, col);
      cell.classList.add(result);
      if (result === "hit") {
        cell.textContent = "X";
        this.checkForWinner();
      } else {
        cell.textContent = "-";
        this.adjustForCurrentPlayer();
      }
      this.updatePlayerStats(this.gameManager.player1);
      this.updatePlayerStats(this.gameManager.player2);
    }
  }

  checkForWinner() {
    let result = false;
    let winner = this.gameManager.winningPlayer;
    if (winner != null) {
      let divAlert = document.getElementById("player" + winner.id + "Alert");
      divAlert.classList.add("winner");
      divAlert.textContent = "Winner!";
      // TODO: Freeze both boards
    }
  }

  adjustForCurrentPlayer(player) {
    if (this.gameManager.currentPlayer === this.gameManager.player1) {
      this.player1Alert.textContent = "Your turn!";
      this.player2Alert.textContent = "";
      if (this.player2BoardDiv.classList.contains("frozen")) {
        this.player2BoardDiv.classList.remove("frozen");
      }
      if (!this.player1BoardDiv.classList.contains("frozen")) {
        this.player1BoardDiv.classList.add("frozen");
      }
    } else {
      this.player1Alert.textContent = "";
      this.player2Alert.textContent = "Your turn!";
      if (this.player1BoardDiv.classList.contains("frozen")) {
        this.player1BoardDiv.classList.remove("frozen");
      }
      if (!this.player2BoardDiv.classList.contains("frozen")) {
        this.player2BoardDiv.classList.add("frozen");
      }
    }
  }

  renderGameBoards() {
    this.renderPlayer(this.gameManager.player1);
    this.renderPlayer(this.gameManager.player2);
  }

  renderPlayer(player) {
    this.renderPlayerHeader(player);
    this.renderGameBoard(player);
    this.updatePlayerStats(player);
  }

  renderPlayerHeader(player) {
    const titleID = "player" + player.id + "Title";
    const divPlayerTitle = document.getElementById(titleID);
    divPlayerTitle.textContent = player.name;

    if (this.gameManager.currentPlayer === this.gameManager.player1) {
      this.player1Alert.textContent = "Your turn!";
      this.player2Alert.textContent = "";
    } else {
      this.player1Alert.textContent = "";
      this.player2Alert.textContent = "Your turn!";
    }
  }

  renderGameBoard(player) {
    let divGameBoard;
    if ( player.id === 1 ) {
      divGameBoard = this.player1BoardDiv;
    } else {
      divGameBoard = this.player2BoardDiv;
    }
    this.renderCells(player, divGameBoard);
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

  updatePlayerStats(player) {
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
    if (player === this.gameManager.player1) {
      this.stats1.textContent = strStats;
    } else {
      this.stats2.textContent = strStats;
    }
  }

  newGame() {
    this.gameManager.newGame();
    this.player1BoardDiv.replaceChildren(); 
    this.player2BoardDiv.replaceChildren(); 
    this.renderGameBoards();
    this.player2BoardDiv.classList.remove("frozen");
    this.player1BoardDiv.classList.add("frozen");
  }

}
