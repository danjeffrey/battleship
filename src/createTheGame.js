// createTheGame.js

import Player from "./Player.js";
import GameManager from "./GameManager.js";
import GameRenderer from "./GameRenderer.js";

export default function createTheGame() {
    const player1 = new Player(false, "Dan Jeffrey", 1);
    player1.placeAllShips();
    const player2 = new Player(true, "Robbie the Robot", 2);
    player2.placeAllShips();
    const gameRenderer = new GameRenderer();
    const gameManager = new GameManager(player1, player2, gameRenderer);
    gameRenderer.renderGame();

}
