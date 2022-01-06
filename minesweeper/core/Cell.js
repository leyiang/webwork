import config from "../config.js";

export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.val = null;
        this.open = false;
        this.flag = false;

        this.cover = {
            x: this.x,
            y: this.y,
            size: game.mode.size,
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

        if( this.open && this.cover.size > 0) {
            this.cover.size -= 1;
        }

        rect(c, this.cover.x, this.cover.y, config.color.grass[style], this.cover.size);

        if ( this.open) {
            if (this.val === "*") {
                circle(c, this.x, y);
            } else if (this.val !== 0) {
                let color = config.color.text[ this.val ] || "black";
                text(c, this.val, this.x, this.y, color);
            }
        } else if (this.flag) {
            const { size } = game.mode;
            const flagSize = size * .6;

            c.drawImage(game.images.flag_icon, this.x * size + size / 2 - flagSize / 2, this.y * size + size / 2 - flagSize / 2, flagSize, flagSize);
        }

    }
}