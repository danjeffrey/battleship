// createTheGame.js

import Player from "./Player.js";
import GameModel from "./GameModel.js";
import GameView from "./GameView.js";
import GameController from "./GameController.js";

export default function createTheGame() {
  const player1 = new Player(false, "Dan Jeffrey", 1);
  player1.placeAllShips();
  const player2 = new Player(true, "Robbie the Robot", 2);
  player2.placeAllShips();

  const model = new GameModel(player1, player2);
  const view = new GameView(model);
  const controller = new GameController(model, view);
}
