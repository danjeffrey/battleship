// createTheGame.js

import Player from "./Player.js";
import GameManager from "./GameManager.js";
import GameRenderer from "./GameRenderer.js";

export default function createTheGame() {
    const player1 = new Player(true, "Dan Jeffrey");
    player1.placeAllShips();
    const player2 = new Player(false, "Robbie the Robot");
    player2.placeAllShips();
    const gameManager = new GameManager();
    gameManager.newGame(player1, player2);
    const gameRenderer = new GameRenderer(gameManager);
    gameRenderer.renderGameBoards();
}
