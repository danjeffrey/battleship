// Player.js
import GameBoard from "./GameBoard.js";

export default class Player {
  isBot = false;
  name = "no name";
  gameBoard = new GameBoard();
  hits = 0;
  misses = 0;
  id = 0;
  wins = 0;
  losses = 0;

  constructor(isRobot, playerName, id) {
    this.isBot = isRobot;
    this.name = playerName;
    this.id = id;
  }

  placeAllShips() {
    // Column 1
    this.gameBoard.placeShip(4, 1, 1, "V");
    this.gameBoard.placeShip(2, 6, 1, "V");
    // Column 3
    this.gameBoard.placeShip(3, 1, 3, "V");
    this.gameBoard.placeShip(1, 5, 3, "V");
    this.gameBoard.placeShip(1, 7, 3, "V");
    this.gameBoard.placeShip(1, 9, 3, "V");
    // Column 5
    this.gameBoard.placeShip(3, 1, 5, "V");
    this.gameBoard.placeShip(1, 5, 5, "V");
    // Column 7
    this.gameBoard.placeShip(2, 1, 7, "V");
    // Column 9
    this.gameBoard.placeShip(2, 1, 9, "V");
  }
}
