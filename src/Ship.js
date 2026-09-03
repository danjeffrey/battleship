// Ship.js
"use strict"

export default class Ship {
    id;
    length;
    hits = 0;
    sunk = false;

    constructor(len) {
        this.length = len;
    }

    hit() {
        this.hits++;
        this.isSunk();
        return this;
    }

    isSunk() {
        if ( this.hits >= this.length ) {
            this.sunk = true;
        }
        return this.sunk;
    }

}