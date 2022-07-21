/**
 * Async way to load image
 * Assure all images is loaded
 */
function loadImage( src ) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = src;
    });
}

class MagicGrid {
    constructor( pool, config ) {
        const defaultConfig = {
            /**
             * The Gutter between images
             */
            gap: 10,

            /**
             * Default Container Selector
             */
            el: ".magic-grid-container",

            /**
             * Default Column Width
             */
            width: 300,
        };

        /**
         * Pool of image
         */
        this.pool = pool;

        /**
         * Combine Default Config With User Config
         */
        this.config = Object.assign({}, defaultConfig, config );

        this.loading = false;
        this.init();
    }

    init() {
        /**
         * Retrieve container element
         */
        this.el = document.querySelector( this.config.el );

        /**
         * Reference of all grid-item ( wrapper div of image )
         */
        this.items = [];

        this.setup();

        /**
         * Save all the height info, use to choose the shortest column
         */
        this.record = Array( this.col ).fill( 0 );
    }

    setup() {
        /**
         * Get The Width of container
         */
        this.elWidth = this.el.getBoundingClientRect().width;

        /**
         * Compute how many column can be put
         */
        this.col = Math.floor( (this.elWidth + this.config.gap) / (this.config.width + this.config.gap) );
    }


    append( test=true) {
        /**
         * Retrieve images from pool
         */
        const images = this.pool.get();

        /**
         * Convert image url to promise list
         */
        const waiting = images.map( loadImage );

        /**
         * Wait every image to be loaded
         */
        Promise.all( waiting ).then( images => {
            images.forEach( image => {

                const el = document.createElement("div");

                el.classList.add("magic-grid-item");
                el.style = `width: ${ this.config.width }px; position: absolute; will-change: transform;`
                el.appendChild( image );

                this.items.push( el );
                this.el.appendChild( el );

                el.__height = image.height;

                setTimeout(() => {
                    el.style.transition = "transform .3s";
                });
            });

            if( test ) this.resize();
        });
    }

    getSlot() {
        let index = 0, height = this.record[index];

        for(let i = 1; i < this.record.length; i++) {
            if( this.record[i] < height ) {
                height = this.record[i];
                index = i;
            }
        }

        return {
            i: index,
            x: index * this.config.width + (index) * this.config.gap,
            y: height,
        }
    }

    setPos( el, x, y ) {
        el.style.transform = `translate(${x}px, ${y}px)`;
    }

    resize() {
        let maxHeight = 0;
        this.record = Array( this.col ).fill( 0 );

        this.items.forEach( (item, t) => {
            const col = this.getSlot();
            const rect = item.getBoundingClientRect();

            this.setPos( item, col.x, col.y );
            this.record[ col.i ] += rect.height + this.config.gap;
            if( this.record[ col.i ] > maxHeight ) maxHeight = this.record[ col.i ];
        });

        this.el.style.height = maxHeight + "px";
    }
}