// GameView.js
import GameController from "./GameController.js";
import GameTypes from "./GameTypes.js";
import GamePhases from "./GamePhases.js";

export default class GameView {
  #model;
  #divMain; // HTML element that holds the game view
  #divPlayerStats;
  #divOpponentStats;

  divBoardOpponent;
  divBoardPlayer;

  constructor(mdl) {
    this.#model = mdl;
    this.#divMain = document.getElementById("main");
  }

  render(gameType, gamePhase) {
    // Erase the main game board no matter what else is going on:
    this.#divMain.innerHTML = "";
    if (gameType === GameTypes.SINGLE_PLAYER_GAME) {
      switch (gamePhase) {
        case GamePhases.GAME_SETUP:
          this.renderGameSetup(this.#model.player1);
          break;
        case GamePhases.GAME_ON:
          this.renderSinglePlayerGame();
          break;
        case GamePhases.GAME_OVER:
          this.renderSinglePlayerGame();
          break;
      }
    }
  }

  renderGameSetup(player) {
    let myBoardData = player.gameBoard;
    let divMain = document.getElementById("main");

    let h3Title = document.createElement("h3");
    h3Title.textContent = "New Game";
    h3Title.classList.add("newGameTitle");
    divMain.appendChild(h3Title);

    let pDescription = document.createElement("p");
    pDescription.textContent =
      "Complete the form and position your ships to start a new game.";
    pDescription.classList.add("newGameDescription");
    divMain.appendChild(pDescription);

    // Player1 input div:
    let divPlayer1 = document.createElement("div");
    divPlayer1.classList.add("player");
    divPlayer1.classList.add("edit");
    divMain.appendChild(divPlayer1);

    let lblPlayer1 = document.createElement("label");
    lblPlayer1.textContent = " Player 1 name:";
    lblPlayer1.htmlFor = "player1NameInput";
    lblPlayer1.classList.add("playerName"); 
    lblPlayer1.classList.add("label"); 
    divPlayer1.appendChild(lblPlayer1);

    const inputPlayer1Name = document.createElement("input");
    inputPlayer1Name.type = "inputPlayer1Name";
    inputPlayer1Name.id = "textInput";
    inputPlayer1Name.name = "inputPlayer1Name";
    divPlayer1.appendChild(inputPlayer1Name);

    // Player2 input div:
    let divPlayer2 = document.createElement("div");
    divPlayer1.classList.add("player");
    divPlayer1.classList.add("edit");
    divMain.appendChild(divPlayer2);

    let lblPlayer2 = document.createElement("label");
    lblPlayer2.textContent = " Player 2 name:";
    lblPlayer2.htmlFor = "player2NameInput";
    lblPlayer2.classList.add("playerName"); 
    lblPlayer2.classList.add("label"); 
    divPlayer2.appendChild(lblPlayer2);

    const inputPlayer2Name = document.createElement("input");
    inputPlayer2Name.type = "inputPlayer2Name";
    inputPlayer2Name.id = "textInput";
    inputPlayer2Name.name = "inputPlayer2Name";
    divPlayer2.appendChild(inputPlayer2Name);

    // Game board to place ships
    let divPlaceShips = document.createElement("div");
    divPlaceShips.classList.add("gameBoard");
    divMain.appendChild(divPlaceShips);

    let btnOK = document.createElement("button");
    btnOK.id = "newGameOK";
    btnOK.textContent = "OK";
    btnOK.classList.add("button");
    btnOK.classList.add("OK");
    divMain.appendChild(btnOK);
  }

  renderSinglePlayerGame() {
    let player = this.#model.currentPlayer;
    let opponent = this.#model.player2;
    if (this.#model.currentPlayer !== this.#model.player1) {
      opponent = this.#model.player1;
    }

    let opponentBoardData = opponent.gameBoard;
    let myBoardData = player.gameBoard;

    let divGameHeader = this.#renderGameHeader(player);

    this.#divPlayerStats = this.#renderStats(this.#divMain, player.id);
    this.#divPlayerStats.classList.add("player");

    // <div id="theCase" class="case">
    let divCase = document.createElement("div");
    divCase.classList.add("case");
    this.#divMain.appendChild(divCase);
    this.divBoardOpponent = this.#renderGameBoard(
      divCase,
      true,
      opponentBoardData,
      opponent.id,
    );
    this.divBoardPlayer = this.#renderGameBoard(
      divCase,
      false,
      myBoardData,
      player.id,
    );

    this.#divOpponentStats = this.#renderStats(this.#divMain, opponent.id);
    this.#divOpponentStats.classList.add("opponent");
    this.#freezeIfGameOver();
    this.updateStats();
  }

  updateStats() {
    let strStats = this.#model.currentPlayer.getStatsString();
    this.#divPlayerStats.textContent = strStats;
    let strStatss = this.#getOpponent().getStatsString();
    this.#divOpponentStats.textContent = strStatss;
  }

  resetGame() {
    this.divBoardOpponent.classList.remove("frozen");
    this.divBoardPlayer.classList.remove("frozen");
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
    this.#divMain.appendChild(divGameHeader);

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
    btnEdit.classList.add("button");
    btnEdit.classList.add("edit");
    divGameHeader.appendChild(btnEdit);

    return divGameHeader;
  }

  // id = 2 means the opponent. id = 1 means current player
  #renderGameBoard(divParent, active, gameBoardData, id) {
    let divGameBoard = document.createElement("div");
    divGameBoard.id = "gameBoard" + id;
    divGameBoard.classList.add("gameBoard");
    if (active) {
      divGameBoard.classList.add("active");
    }
    divParent.appendChild(divGameBoard);
    this.#renderCells(divGameBoard, gameBoardData);
    return divGameBoard;
  }

  #renderCells(divGameBoard, boardData) {
    // Clear the board first:
    divGameBoard.innerHTML = "";
    // const hitSet = new Set(boardData.hits.map((h) => `${h.row},${h.col}`));
    // const missSet = new Set(boardData.misses.map((h) => `${h.row},${h.col}`));
    boardData.rows.forEach(function (row) {
      boardData.cols.forEach(function (col) {
        // TODO: Show ship cells for player's board.
        const cell = document.createElement("div");
        divGameBoard.appendChild(cell);
        cell.id = "cell[" + row + "][" + col + "]";
        cell.classList.add("cell");

        let [shipIndex, wasClicked] = boardData.getCellValues(row, col);

        if (divGameBoard.id === "gameBoard1") {
          if (shipIndex > -1) {
            const ship = boardData.ships[shipIndex];
            cell.classList.add("ship" + ship.size);
          }
        }
        if (wasClicked) {
          if (shipIndex > -1) {
            cell.textContent = "X";
            cell.classList.add("hit");
          } else {
            cell.textContent = "-";
            cell.classList.add("miss");
          }
        } else {
          cell.textContent = "";
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

  #freezeIfGameOver() {
    if (this.#model.weHaveAWinner) {
      this.divBoardOpponent.classList.add("frozen");
      this.divBoardPlayer.classList.add("frozen");
    } else {
      this.divBoardOpponent.classList.remove("frozen");
      this.divBoardPlayer.classList.add("frozen");
    }
  }
}
