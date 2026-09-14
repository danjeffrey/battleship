// RoboPlayer.js

import GameModel from "./GameModel.js";
import Player from "./Player.js";

export default class RoboPlayer {
    history = [];
    gameModel;

    constructor(model) {
        this.gameModel = model;        
    }

    makeAMove() {
        let [row, col] = this.pickACell();
        let result = this.gameModel.playerMove(row, col);
        return result;
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

