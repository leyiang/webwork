import Particle from "./Particle.js";

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

export default class ParticleTimer {
    constructor( canvas ) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.config = {
            mode: '24',
            padding: 2,
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

        this.time = "::::::::";
        this.oldTime = "";

        this.init();
    }

    init() {
        const { size, gap } = this.config.particle;
        this.canvas.width = 8 * size * 7 + 7 * gap * size + 2 * this.config.padding * size;
        this.canvas.height = size * 10 + 2 * this.config.padding * size;

        this.loop();

        this.tiktok();
        setInterval(() => {
            this.tiktok();
        }, 1000);
    }

    tiktok() {
        this.particles.still = [];
        this.particles.moving = [];

        this.oldTime = this.time;
        this.time = this.getTimeString();
        this.renderString( this.time );
    }

    loop() {
        this.update();
        this.render();

        requestAnimationFrame( () => this.loop() );
    }

    update() {
        this.particles.moving.forEach( particle => particle.update() );
    }

    parseCharacter( spec, hOffset=0, callback ) {
        const { size, gap, padding } = this.config.particle;
        hOffset = hOffset * 7 * size + hOffset * gap * size;

        spec.forEach( (row, v) => {
            row.forEach( (cell, h) => {
                let x = h * size + hOffset + size * this.config.padding, y = v * size + this.config.padding * size;
                if( cell ) callback( x, y, size, padding );
            });
        });
    }

    generateParticles( spec, hOffset, pushTo=[], config ) {
        this.parseCharacter( spec, hOffset, (x, y, size, padding) => {
            pushTo.push( new Particle(x, y, size, padding, config) );
        });
    }

    getMovingParticles() {
        this.time.split('')
            .forEach( (ch, i) => {
                if(  ch !== this.oldTime[i] ) {
                    this.generateParticles( words[ch], i, this.particles.moving, { fill: "RANDOM" } );
                }
            });
    }

    renderString(str) {
        this.getMovingParticles();
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
        // this.context.fillStyle = "#999999";
        // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.still.forEach( particle => particle.render(this.context) );
        this.particles.moving.forEach( particle => particle.render(this.context) );
    }
}
