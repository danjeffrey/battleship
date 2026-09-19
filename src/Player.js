// Player.js
import GameBoard from "./GameBoard.js";
import RoboPlayer from "./RoboPlayer.js";

export default class Player {
  isBot = false;
  name = "no name";
  gameBoard = new GameBoard();
  hits = 0;
  misses = 0;
  wins = 0;
  losses = 0;
  id = 0;
  hasWon = false;

  constructor(isRobot, playerName, id) {
    this.isBot = isRobot;
    this.name = playerName;
    this.id = id;
  }

  placeAllShips() {
    this.gameBoard.placeShip(4, true);
    this.gameBoard.placeShip(3);
    this.gameBoard.placeShip(3);
    this.gameBoard.placeShip(2);
    this.gameBoard.placeShip(2);
    this.gameBoard.placeShip(2);
    this.gameBoard.placeShip(1);
    this.gameBoard.placeShip(1);
    this.gameBoard.placeShip(1);
    this.gameBoard.placeShip(1);
    this.gameBoard.debugShipPlacement();
  }

  editPlayer(event) {
    const newValue = prompt("Enter a name:");
    const btn = event.target;
    this.name = newValue;
  }

  isReady() {
    return this.gameBoard.isReady();
  }

  getStatsString() {
    let stats =
      "" +
      this.hits +
      " hits, " +
      this.misses +
      " misses [" +
      this.wins +
      "-" +
      this.losses +
      "]";
    if (this.hasWon) {
      stats = stats + " --- You Won!";
    }
    return stats;
  }

  clear() {
    this.gameBoard.clear();
    this.hits = 0;
    this.misses = 0;
    this.hasWon = false;
    this.placeAllShips();
  }
}
