const path = (context, callback) => {
    context.save();
    context.beginPath();
    callback();
    context.closePath();
    context.restore();
};


const rect = (context, x, y, fill = "#000", rectSize = game.mode.size, angle = null, size = game.mode.size ) => {
    path(context, () => {
        context.fillStyle = fill;
        context.translate( x * size + rectSize / 2, y * size + rectSize / 2 );
        context.rotate( angle );
        context.rect(-rectSize/2, -rectSize / 2, rectSize, rectSize);
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

const rand = max => Math.floor( Math.random() * max );
