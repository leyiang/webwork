function path( context, callback ) {
    callback();
    context.closePath();
}

function randomItem( arr ) {
    return arr[ Math.floor( Math.random() * arr.length ) ];
}

export default class Particle {
    constructor(x, y, size, padding, config={}) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.padding = padding;
        this.fill = "#000000";

        if( config.fill === "RANDOM" ) {
            this.fill = randomItem(["#ff598f", "#fd8a5e", "#e0e300", "#01dddd", "#00bfaf", "#733ca4", "#e33876"]);
        }

        this.sx = (Math.random() < .5 ? 1 : -1) * Math.random();
        this.sy = -2;

        this.ax = 0;
        this.ay = .15;
    }

    render( context ) {
        context.beginPath();
        context.arc(
            this.x + (this.size / 2 - this.padding),
            this.y + (this.size / 2 - this.padding),
            this.size / 2 - this.padding,
            0,
            2 * Math.PI
        );
        context.fillStyle = this.fill;
        context.fill();

        context.closePath();
        path( context, () => {

        });
    }

    update() {
        this.sy += this.ay;
        this.y += this.sy;

        this.sx += this.ax;
        this.x += this.sx;
        // this.x += -1 + Math.random() * 2;
    }
}
