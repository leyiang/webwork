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

const canvas = document.querySelector("#app");
const context = canvas.getContext("2d");

const config = {
    mode: '24',
    particle: {
        size: 10,
        padding: 1,
        gap: 1
    },
}

// 8 words such that each 7 particle wide
canvas.width = 8 * config.particle.size * 7 + 7 * config.particle.gap * config.particle.size;
// 1 line such that 10 particle high
canvas.height = config.particle.size * 10;

function particle(x, y, context) {
    const { size, padding } = config.particle;

    context.beginPath();
    context.arc( x + (size / 2 - padding), y + (size / 2 - padding), size / 2 - padding, 0, 2 * Math.PI );
    // context.fillStyle = "rgba(0, 0, 0, 0.5)";
    // context.globalAlpha = .5;
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();
}

function drawWord( spec, hOffset=0) {
    const { size, gap } = config.particle;
    hOffset = hOffset * 7 * size + hOffset * gap * size;

    spec.forEach( (row, v) => {
        row.forEach( (cell, h) => {
            let x = h * size + hOffset, y = v * size;
            if( cell ) particle( x, y, context );
        });
    });
}

function drawString( str ) {
    str.split("").forEach((ch, i) => {
        if( ch === ':' ) ch = 10;
        drawWord( words[ch], i );
    });
}

function getTimeString() {
    const date = new Date();

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${ hour }:${ minute }:${ second }`;
}

setInterval(() => {
    requestAnimationFrame(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawString( getTimeString() );
    });
}, 1000);

drawString( "00:00:00" );
// particle(0, 0, config.particle.size, context );
console.log( canvas, context );
