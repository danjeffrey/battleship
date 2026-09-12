// RoboPlayer.js

import GameManager from "./GameManager.js";
import Player from "./Player.js";

export default class RoboPlayer {
    history = [];
    gameManager;

    constructor(gameMgr) {
        this.gameManager = gameMgr;        
    }

    makeAMove() {
        let [x, y] = this.pickACell();
        this.gameManager.playerMove(row, col);
    }

    pickACell() {
        let result = [1, 1];
        // Randomly pick a cell that has not been picked before. 
        do {
            let row = Math.floor(Math.random() * 10) + 1;
            let col = Math.floor(Math.random() * 10) + 1
            result = [row, col];
        } while ( this.history.includes(result) );
        this.history.push(result);
        return(result);
    }



}