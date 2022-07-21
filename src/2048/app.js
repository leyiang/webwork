function randomInt(max, min = 0) {
    return Math.floor(Math.random() * max);
}

function randomPos(x = 4, y = 4) {
    return [
        randomInt(x),
        randomInt(y),
    ];
}

new Game(
    document.querySelector(".grid")
);

// addCell();
// addCell();
