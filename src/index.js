// src/index.js
"use strict";

import "./styles.css";
import generateFooter from "./generateFooter.js";
import GameBoard from "./GameBoard.js";
import GameManager from "./GameManager.js";
import Player from "./Player.js";
import createTheGame from "./createTheGame.js";

generateFooter();
createTheGame();

// console.log(new GameBoard().placeShip(4, 4, 2, "N").grid);
//console.log(new GameBoard().placeShip(4, 4, 2, "S").grid);
// console.log(new GameBoard().placeShip(4, 4, 2, "E").grid);
// console.log(new GameBoard().placeShip(4, 4, 2, "V").grid);
// let vGrid = new GameBoard().placeShip(4, 4, 2, "V").grid;
// console.log(new GameBoard().placeShip(4, 4, 2, "H").grid);
// let board = new GameBoard();
// board.placeShip(4, 4, 2, "H");
// console.log(board.receiveAttack(4, 2));

// const mgr = new GameManager(
//         new Player(true, "Joe Schmoe"),
//         new Player(false, "BotMan"),
// );
// console.log(mgr.ready());

// let x = 0;