// src/index.js
"use strict";

import "./styles.css";
import generateFooter from "./generateFooter.js";
import Gameboard from "./Gameboard.js";

generateFooter();

// console.log(new Gameboard().placeShip(4, 4, 2, "N").grid);
//console.log(new Gameboard().placeShip(4, 4, 2, "S").grid);
// console.log(new Gameboard().placeShip(4, 4, 2, "E").grid);
console.log(new Gameboard().placeShip(4, 4, 2, "V").grid);
let vGrid = new Gameboard().placeShip(4, 4, 2, "V").grid;
console.log(new Gameboard().placeShip(4, 4, 2, "H").grid);
let board = new Gameboard();
board.placeShip(4, 4, 2, "H");
console.log(board.receiveAttack(4, 2));
let x = 0;