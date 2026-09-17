// GameView.js

export default class GameView {
  #model;
  #divGame; // HTML element that holds the game view
  #divPlayerStats;
  #divOpponentStats;
  #singlePlayerMode = true;
  divBoardOpponent;
  divBoardPlayer;

  constructor(mdl) {
    this.#model = mdl;
    this.#divGame = document.getElementById("theGame");
    this.#singlePlayerMode = ( mdl.player1.isBot || mdl.player2.isBot );
  }

  renderGame() {
    let player = this.#model.currentPlayer;
    let opponent = this.#model.player2;
    if (this.#model.currentPlayer !== this.#model.player1) {
      opponent = this.#model.player1;
    }

    let opponentBoardData = opponent.gameBoard;
    let myBoardData = player.gameBoard;

    this.#divGame.innerHTML = "";
    let divGameHeader = this.#renderGameHeader(player);

    this.#divPlayerStats = this.#renderStats(this.#divGame, player.id);
    this.#divPlayerStats.classList.add("player");

    this.divBoardOpponent = this.#renderGameBoard(
      true,
      opponentBoardData,
      opponent.id,
    );
    this.divBoardPlayer = this.#renderGameBoard(false, myBoardData, player.id);

    this.#divOpponentStats = this.#renderStats(this.#divGame, opponent.id);
    this.#divOpponentStats.classList.add("opponent");

    this.updateStats();
  }

  updateStats() {
    let strStats = this.#model.currentPlayer.getStatsString();
    this.#divPlayerStats.textContent = strStats;
    let strStatss = this.#getOpponent().getStatsString();
    this.#divOpponentStats.textContent = strStatss;
  }

  #getOpponent() {
    return this.#model.currentPlayer === this.#model.player1
      ? this.#model.player2
      : this.#model.player1;
  }

  #renderGameHeader(player) {
    const divGameHeader = document.createElement("div");
    divGameHeader.id = "gameHeader";
    divGameHeader.classList.add("gameHeader");
    this.#divGame.appendChild(divGameHeader);

    let divPlayerTitle = document.createElement("div");
    divPlayerTitle.id = "playerTitle";
    divPlayerTitle.classList.add("playerTitle");
    divPlayerTitle.textContent = player.name;
    divGameHeader.appendChild(divPlayerTitle);

    let divAlert = document.createElement("div");
    divAlert.id = "alert";
    divAlert.classList.add("alert");
    //playerAlert.textContent = "???";
    divGameHeader.appendChild(divAlert);

    let btnEdit = document.createElement("button");
    btnEdit.id = "player" + player.id + "Edit";
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("btnEdit");
    divGameHeader.appendChild(btnEdit);

    return divGameHeader;
  }

  // id = 2 means the opponent. id = 1 means current player
  #renderGameBoard(active, gameBoardData, id) {
    let divGameBoard = document.createElement("div");
    divGameBoard.id = "gameBoard" + id;
    divGameBoard.classList.add("gameBoard");
    if (active) {
      divGameBoard.classList.add("active");
    }
    this.#divGame.appendChild(divGameBoard);
    this.#renderCells(divGameBoard, gameBoardData);
    return divGameBoard;
  }

  #renderCells(divGameBoard, boardData) {
    // Clear the board first:
    divGameBoard.innerHTML = "";
    const hitSet = new Set(boardData.hits.map((h) => `${h.row},${h.col}`));
    const missSet = new Set(boardData.misses.map((h) => `${h.row},${h.col}`));
    boardData.rows.forEach(function (row) {
      boardData.cols.forEach(function (col) {
        const cell = document.createElement("div");
        divGameBoard.appendChild(cell);
        cell.id = "cell[" + row + "][" + col + "]";
        cell.classList.add("cell");
        const key = `${row},${col}`;
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

  #renderStats(div, id) {
    //       <div id="stats2" class="playerStats">stats 2</div>
    let divStats = document.createElement("div");
    divStats.id = "stats" + id;
    divStats.classList.add("stats");
    div.appendChild(divStats);
    return divStats;
  }

  #renderWhoseTurn() {
    if (this.#model.weHaveAWinner) {
      this.divBoardOpponent.classList.add("frozen");
      this.divBoardPlayer.classList.add("frozen");
    } else {
      this.divBoardOpponent.classList.remove("frozen");
      this.divBoardPlayer.classList.add("frozen");
    }
  }
}