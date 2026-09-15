// Ship.js
"use strict"

export default class Ship {
    id;
    size;
    hits = 0;
    sunk = false;

    constructor(len) {
        this.size = len;
    }

    hit() {
        this.hits++;
        return this;
    }

    isSunk() {
        if ( this.hits >= this.size ) {
            this.sunk = true;
        }
        return this.sunk;
    }

}