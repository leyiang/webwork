import * as Layers from "../game/layers.js";

export default class View {
    constructor( canvas ) {
        this.canvas = canvas;
        this.c = canvas.getContext("2d");
    }

    init( mode ) {
        this.canvas.width = mode.col * mode.size;
        this.canvas.height = mode.row * mode.size;


        this.layers = [
            // Layers.createBackgroundLayer( this.c, mode ),
            Layers.mineLayer,
        ];
    }

    render() {
        this.c.clearRect( 0, 0, this.canvas.width, this.canvas.height );

        this.layers.forEach( layer => layer( this.c ) );
    }
}