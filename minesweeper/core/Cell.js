import config from "../config.js";

export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.val = null;
        this.open = false;
        this.flag = false;

        this.acc = .01;
        this.diff = .1;
        this.speed = -.15;
        this.speedX = Math.random() % .05
        this.help = false;

        this.cover = {
            x: this.x,
            y: this.y,
            size: game.mode.size,
            angle: 0,
        };
    }

    render(c) {
        const hover = game.mouse ? game.mouse[0] === this.x && game.mouse[1] === this.y : false;
        const style = hover
            ? "hover"
            : ( (this.x + this.y) % 2 ? "dark" : "light" );

        if( this.open ) {
            rect(c, this.x, this.y, config.color.ground[style]);
        }

        if( this.open && this.cover.size > 0 ) {
            if( ! this.cover.angle ) {
                this.cover.angle = Math.random() * (Math.random() < .5 ? 1 : -1) * 3;
            }

            this.speed += this.acc;
            this.cover.y += this.speed;
            this.cover.x += this.speedX;
            this.cover.size -= .5;
        }

        rect(c, this.cover.x, this.cover.y, config.color.grass[style], this.cover.size, this.cover.angle );

        let color = config.color.text[ this.val ] || "black";
        // text(c, this.val, this.x, this.y, color);

        // if( this.val === "*" ) {
        //     circle(c, this.x, this.y);
        // }

        if ( this.open) {
            if (this.val === "*") {
                rect(c, this.x, this.y, this?.mine_color?.bg || "#f4c20d" );
                circle(c, this.x, this.y, this.mine_color.front || "#9f7e08" );
            } else if (this.val !== 0) {
                text(c, this.val, this.x, this.y, color);
            }
        } else if (this.flag) {
            const { size } = game.mode;
            const flagSize = size * .6;

            c.drawImage(game.images.flag_icon, this.x * size + size / 2 - flagSize / 2, this.y * size + size / 2 - flagSize / 2, flagSize, flagSize);
        }
    }

    reveal() {
        // game.tween.add({
        //     duration: 1000,
        //     el: this.cover,
        //     to: {
        //         size: 0,
        //         angle: Math.random() * (Math.random() < .5 ? 1 : -1) * 3,
        //         y: this.y + .5
        //     },
        // });
    }
}