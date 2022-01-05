const path = (context, callback) => {
    context.save();
    context.beginPath();
    callback();
    context.closePath();
    context.restore();
};

const rand = max => Math.floor( Math.random() * max );
