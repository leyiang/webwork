import View from "./core/View.js";
import config from "./config.js";
import interact from "./game/interact.js";
import Event from "./core/Event.js";
import Arena from "./core/Arena.js";
import assets from "./game/assets.js";
import Tween from "./core/Tween.js";

window.game = {
    tween: new Tween,
    event: new Event,
    mode: config.mode.easy,
    canvas: document.getElementById("screen"),
};

game.arena = new Arena( game.mode );
const view = new View( game.canvas );

const loop = () => {
    view.render();
    requestAnimationFrame( loop );
};

const init = () => {
    view.init( game.mode );
    interact( game.canvas, game.mode );

    game.event.on("move", (x, y) => {
        game.mouse = [ x, y ];
    });

    loop();
};

assets().then( images => {
    game.images = images;
    init();
});
