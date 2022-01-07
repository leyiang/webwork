import View from "./core/View.js";
import interact from "./game/interact.js";
import assets from "./game/assets.js";
import Game from "./core/Game.js";

window.game = new Game;
game.init();

const view = new View( game.canvas );

const loop = (t) => {
    view.render(t);
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
