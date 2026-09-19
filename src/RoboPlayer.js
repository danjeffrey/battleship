// RoboPlayer.js

import GameModel from "./GameModel.js";
import Player from "./Player.js";

export default class RoboPlayer {
  controller;
  id = 0;
  #unclickedCells = [];

  constructor(idx, ctrl) {
    this.controller = ctrl;
    // This is needed because a listener calls it from another class
    this.makeAMove = this.makeAMove.bind(this);
    this.id = idx;

    const rows = [...Array(10)].map((_, i) => i + 1); // 1–10
    const cols = [...Array(10)].map((_, i) => i + 1); // 1–10
    for (const r of rows) {
      for (const c of cols) {
        //console.log("" + r + "-" + c);
        this.#unclickedCells.push("" + r + "-" + c);
      }
    }
  }

  //sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async makeAMove() {
    this.controller.waitCursor(true);
    // await this.sleep(300);
    let [row, col] = this.#pickACellFaster();
    //console.log("" + row + ", " + col);
    let hit = this.controller.playerMove(row, col);
    if (hit) {
      const evt = new CustomEvent("makeAnotherMove", { bubbles: false });
      setTimeout(() => document.dispatchEvent(evt), 0);
    }
    this.#unclickedCells = this.#unclickedCells.filter(
      (c) => c != "" + row + "-" + col,
    );
    this.controller.waitCursor(false);
    return hit;
  }

  clear() {
    this.#unclickedCells = [];
  }

  // ################################################################
  // ## Private Methods:

  #pickACellFaster() {
    let result = [];
    const size = this.#unclickedCells.length;
    let str = "";
    if (size === 0) {
      console.log("ERROR: RoboPlayer.#unclicked cells is empty but there is no winner in #pickACellFaster().");
    } else if (size === 1) {
      str = this.#unclickedCells[0];
    } else {
      const idx = Math.floor(Math.random() * size);
      str = this.#unclickedCells[idx];
    }
    if (str !== undefined && str != null) {
      const parts = str.split("-");
      const row = +parts[0];
      const col = +parts[1];
      result = [row, col];
    }
    return result;
  }

}
