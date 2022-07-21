class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    mag() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }

    clone() {
        return new Vec( this.x, this.y );
    }

    sub( vec ) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    mul(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    normalize() {
        return this.div( this.mag() );
    }

    setMag( n ) {
        return this.normalize().mul( n );
    }
}