import Tween from "./Tween.js";
import Event from "./Event.js";
import config from "../config.js";
import Arena from "./Arena.js";

export default class Game {
    constructor() {
        this.over = false;
        this.ribbon_list = [];
    }

    init() {
        this.tween = new Tween;
        this.event = new Event;
        this.mode = config.mode.hard;
        this.canvas = document.getElementById("screen");
        this.arena = new Arena(this.mode);

        game.event.on("click", (x, y) => {
            if( this.over ) return;

            // Generate Arena
            this.arena.initArena( x, y );
            this.arena.click( x, y );
        });

        game.event.on("right", (x, y) => {
            if( this.over ) return;

            this.arena.initArena( x, y );
            this.arena.mark( x, y );
        });
    }

    shake() {
        game.canvas.classList.add("shake");
        game.canvas.addEventListener("animationend", e => {
            e.target.classList.remove("shake");
        });
    }

    lose() {
        this.over = true;
    }

    win() {

    }
}