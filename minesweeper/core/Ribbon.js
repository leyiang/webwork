export default class Ribbon {
    constructor(x, y, color="pink") {
        this.x = x + 60 * Math.random() * ( Math.random() < .5 ? -1 : 1) ;
        this.y = y + 60 * Math.random() * ( Math.random() < .5 ? -1 : 1);

        this.oldY = this.y;
        this.wind = .4;

        this.fall = 0;
        this.fallAcc = -.8;
        this.rotate = 0;
        this.rotateC = Math.random() * .05 * ( Math.random() < .5 ? -1 : 1);

        this.width = 24;
        this.height = 12;
        this.opacity = 1;
        this.color = color;
        this.opacityAcc = Math.random() * 0.001;
        // this.fall = .5;
    }

    render( c, t ) {
        this.update( t );
        if( this.opacity < .1 ) return;

        path(c, () => {
            c.translate( this.x + this.width / 2, this.y + this.height / 2 );
            c.globalAlpha = this.opacity;
            c.rotate( this.rotate );
            c.fillStyle = this.color;
            c.fillRect( -this.width/2, -this.height/2, this.width, this.height );
        });
    }

    update( t=0 ) {
        this.x += this.wind * Math.sin( .0025 * t );

        if( this.oldY - this.y > .5 ) {
            this.fallAcc += .07;
        }

        this.fall += this.fallAcc;
        if( this.fall > .5 ) this.fall = .5;
        this.y += this.fall;
        this.rotate += this.rotateC;

        if( this.fall > .49 ) {
            this.width *= .991;
            this.height *= .991;
            this.opacity -= (.005 + this.opacityAcc);
        }

        if( this.opacity < .01 ) {
            game.ribbon_list.splice( game.ribbon_list.indexOf( this ), 1 );
        }
    }
}