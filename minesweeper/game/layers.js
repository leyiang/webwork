import config from "../config.js";

const createLayer = (context) => {
    const canvas = document.createElement("canvas");

    canvas.width = context.canvas.width;
    canvas.height = context.canvas.height;

    return canvas;
}

const rect = (context, x, y, fill = "#000", size = game.mode.size) => {
    path(context, () => {
        context.fillStyle = fill;
        context.rect(x * size, y * size, size, size);
        context.fill();
    });
};

const circle = (c, x, y, fill = "#000", size = game.mode.size) => {
    path(c, () => {
        c.fillStyle = fill;
        c.arc(x * size + size / 2, y * size + size / 2, size / 4, 0, 2 * Math.PI);
        c.fill();
    });
};

const text = (c, val, x, y, fill = "#000", size = game.mode.size) => {
    path(c, () => {
        c.font = "20px Arial Black";
        c.textBaseline = 'middle';
        c.textAlign = "center";
        c.fillStyle = fill;
        c.fillText(val, x * size + size / 2, y * size + size / 2 + 3);
    });
};

// export function createBackgroundLayer( context ) {
//     const layer = createLayer( context );
//     const layerContext = layer.getContext("2d");
//
//     for(let y = 0; y < game.mode.row; y++) {
//         for(let x = 0; x < game.mode.col; x++) {
//             const style = (x + y) % 2 ? config.color.grass.dark : config.color.grass.light;
//             rect( layerContext, x, y, style );
//         }
//     }
//
//     return function( c ) {
//         c.drawImage( layer, 0, 0 );
//     }
// }

export function mineLayer(c) {
    for (let y = 0; y < game.mode.row; y++) {
        for (let x = 0; x < game.mode.col; x++) {
            const cell = game.arena.get(x, y);

            const type = cell.open ? "ground" : "grass";
            const hover = game.mouse ? game.mouse[0] === x && game.mouse[1] === y : false;
            const style = hover
                ? "hover"
                : ( (x + y) % 2 ? "dark" : "light" );

            rect(c, x, y, config.color[type][style]);

            if ( cell.open) {
                if (cell.val === "*") {
                    circle(c, x, y);
                } else if (cell.val !== 0) {
                    text(c, cell.val, x, y);
                }
            } else if (cell.flag) {
                const { size } = game.mode;
                const flagSize = size * .6;

                c.drawImage(game.images.flag_icon, x * size + size / 2 - flagSize / 2, y * size + size / 2 - flagSize / 2, flagSize, flagSize);
            }
        }
    }
}