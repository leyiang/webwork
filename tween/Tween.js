class Tween {
    constructor( target, handler, config ) {
        this.target = target;
        this.handler = handler;

        this.start = config.start;
        this.end = config.end;

        this.easing = config.easing;

        this.from = config.from;
        this.to = config.to;
        this.keys = [];

        this.duration = config.duration;
        this.running = false;
        this.store = target.__like || (target.__like = {});
    }

    init() {
        for(let key in this.to) {
            if( ! (key in this.from) ) {
                this.from[ key ] = this.store[ key ] || 0;
            }
            this.keys.push( key );
        }

        for(let key in this.from ) {
            if( ! (key in this.to) ) {
                this.to[ key ] = this.store[ key ] || 0;
                this.keys.push( key );
            }
        }
    }

    tick( percent ) {
        const e = this.easing( percent );

        this.keys.forEach( (key, i) => {
            this.store[ key ] = this.from[key] + (this.to[key] - this.from[key] ) * e;
        });

        this.handler( this.target, this.store );
    }
}

const tweens = [];
const jobs = [];
let ticking = 0;

function tick( now ) {
    while( jobs.length ) {
        const job = jobs.shift();
        job( now );
    }

    tweens.forEach( (tween, i) => {
        if( now < tween.start ) {
            return;
        }

        if( ! tween.running ) {
            tween.running = true;
            tween.init();
        }

        const t = (now - tween.start) / (tween.end - tween.start);
        tween.tick( (t < 1) ? t : 1 );

        if( now > tween.end ) {
            tweens.splice( i, 1 );
        }
    });

    if( tweens.length || jobs.length ) {
        ticking = requestAnimationFrame( tick );
    } else {
        ticking = 0;
    }
}

var easeOutBy = function (power) { return function (t) { return 1 - Math.abs(Math.pow(t - 1, power)); }; };

const ease = {
    linear: t => t,
    // quadOut: t => 2*t - t**2
    quadOut: easeOutBy(2)
};

function createTween( handler ) {
    return function( target, config ) {
        const delay = config.delay || 0;
        const duration = config.duration || 1000;

        jobs.push(function(now) {
            const tween = new Tween( target, handler, {
                start: now + delay,
                end: now + delay + duration,
                duration,
                from: config.from || {},
                to: config.to || {},
                easing: ease[ config.easing ] || ease[ "linear" ],
            });

            tweens.push( tween );
        });

        if( ! ticking ) {
            ticking = requestAnimationFrame( tick );
        }
    }
}