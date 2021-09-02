const words = [
    [
        [0,0,1,1,1,0,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,0,1,1,0],
        [0,0,1,1,1,0,0]
    ],

    [
        [0,0,0,1,1,0,0],
        [0,1,1,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [1,1,1,1,1,1,1]
    ],

    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1],
    ],
    [
        [1,1,1,1,1,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],
    [
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,0],
        [0,0,1,1,1,1,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,1,1,0],
        [1,1,1,1,1,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,1]
    ],//4
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//5
    [
        [0,0,0,0,1,1,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//6
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0]
    ],//7
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//8
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,1,1,0,0,0,0]
    ],//9
    [
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0]
    ]//:
];

function path( context, callback ) {
    context.beginPath();
    callback();
    context.closePath();
}

class ParticleTimer {
    constructor( canvas ) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.config = {
            mode: '24',
            particle: {
                size: 10,
                padding: 1,
                gap: 1
            },
        }

        this.particles = {
            still: [],
            moving: [],
        };

        this.init();
    }

    init() {
        const { size, gap } = this.config.particle;
        this.canvas.width = 8 * size * 7 + 7 * gap * size;
        this.canvas.height = size * 10;

        setInterval(() => {
            this.particles.still = [];
            this.particles.moving = [];

            requestAnimationFrame(() => {
                this.render();
            });
        }, 1000);
    }

    parseCharacter( spec, hOffset=0, callback ) {
        const { size, gap, padding } = this.config.particle;
        hOffset = hOffset * 7 * size + hOffset * gap * size;

        spec.forEach( (row, v) => {
            row.forEach( (cell, h) => {
                let x = h * size + hOffset, y = v * size;
                if( cell ) callback( x, y, size, padding );
            });
        });
    }

    generateParticles( spec, hOffset, pushTo=[], config ) {
        this.parseCharacter( spec, hOffset, (x, y, size, padding) => {
            pushTo.push( new Particle(x, y, size, padding, config) );
        });
    }

    renderString(str) {
        const ch = str[ str.length - 1 ]
        this.generateParticles( words[ch], str.length-1, this.particles.moving, { fill: "#FF0000"} );

        str.split("").forEach((ch, i) => {
            if( ch === ':' ) ch = 10;
            this.generateParticles( words[ch], i, this.particles.still );
        });
    }

    getTimeString() {
        return /\d\d:\d\d:\d\d/.exec( new Date )[0];
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.renderString( this.getTimeString() );
        console.log( this.particles );
        this.particles.still.forEach( particle => particle.draw(this.context) );
        this.particles.moving.forEach( particle => particle.draw(this.context) );
    }
}


class Particle {
    constructor(x, y, size, padding, config) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.padding = padding;
        this.fill = "#000000";

        Object.assign( this, config );
    }

    render( context ) {
        path( context, () => {
            context.arc(
                this.x + (this.size / 2 - this.padding),
                this.y + (this.size / 2 - this.padding),
                this.size / 2 - this.padding,
                0,
                2 * Math.PI
            );
            context.fillStyle = this.fill;
            context.fill();
        });
    }

    draw( context ) {
        this.render( context );
    }
}

new ParticleTimer(
    document.querySelector("#app")
);
