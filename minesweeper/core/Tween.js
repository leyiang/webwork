export default class Tween {
    constructor() {
        this.jobs = [];
        this.tween = [];
        this.ticking = false;

        this.defaultConfig = {
            duration: 1000,
            easing: "linear",
            delay: 0,
            from: {},
            to: {},
        };
    }

    add( config ) {
        config = Object.assign( {}, this.defaultConfig, config );

        this.jobs.push(now => {
            this.tween.push({
                el: config.el,
                start: now,
                end: now + config.duration,
                from: config.from,
                to: config.to,
                easing: config.easing,
            });
        });

        if( ! this.ticking ) {
            this.ticking = requestAnimationFrame( (now) => this.tick(now) );
        }
    }

    init( tween ) {
        for(let key in tween.to ) {
            tween.from[ key ] = tween.el[ key ];
        }
    }

    tick( now ) {
        while( this.jobs.length ) {
            let job = this.jobs.shift();
            job( now );
        }

        for(let i = 0; i < this.tween.length; i++ ) {
            const tween = this.tween[i];

            if( now < tween.start ) continue;

            if( ! tween.running ) {
                this.init( tween );
                tween.running = true;
            }

            const t = (now - tween.start) / (tween.end - tween.start);

            for(let key in tween.to) {
                tween.el[ key ] = tween.from[ key ] + (tween.to[key] - tween.from[key]) * t;
            }

            if( now > tween.end ) {
                this.tween.splice( i--, 1 );
            }
        }

        if( this.jobs.length || this.tween.length ) {
            this.ticking = requestAnimationFrame( (now) => this.tick(now) );
        } else {
            this.ticking = false;
            console.log("DONE");
        }
    }
}