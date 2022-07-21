import config from "../config.js";

const createLayer = (context) => {
    const canvas = document.createElement("canvas");

    canvas.width = context.canvas.width;
    canvas.height = context.canvas.height;

    return canvas;
}

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
    game.arena.cells.forEach( cell => cell.render(c) );
}

export function ribbonLayer( c, t ) {
    game.ribbon_list.forEach( ribbon => ribbon.render(c, t) );
}