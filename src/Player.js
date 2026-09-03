// Player.js
import Gameboard from "./Gameboard";

export default class Player {
    isReal = true;
    name = "no name";
    gameBoard = new Gameboard();

    constructor(isRealPlayer, playerName) {
        this.isReal = isRealPlayer;
        this.name = playerName;
    }

}