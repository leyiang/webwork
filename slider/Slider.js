class Slider {
    constructor( config ) {
        this.init( config );
        this.bind();
    }

    init( config ) {
        /**
         * Slider Element
         */
        this.el = config.el;

        if( ! this.el ) {
            throw new Error("An Slider Element is Needed");
        }

        /**
         * Slider Inner, Wrap all slides in one line
         * Translate it to get show different slides
         */
        this.inner = this.el.querySelector(".a-slider-inner");

        /**
         * Get The max page number of current provided Slider Element
         */
        this.maxPage = this.inner.querySelectorAll(".a-slide").length * -1;

        /**
         * Get Width of Slider Element
         */
        this.width = parseInt( window.getComputedStyle( this.el )["width"] );

        const defaultConfig = {
            threshold: .5,
            autoplay: false,
            currentPage: 0,
            interval: 2000,
        };

        /**
         * Combine default config with user config
         * @type {object}
         */
        this.config = Object.assign({}, defaultConfig, config );

        /**
         * Move to the first page
         */
        this.move( 0, 0);

        if( this.config.autoplay ) {
            this.registerAutoplayInterval();
        }
    }

    bind() {
        let start = null;
        let origin = null;
        let offset = 0;

        document.addEventListener("mousemove", e => {
            // Dragging
            if(
                e.buttons === 1 &&
                start !== null &&
                origin !== null
            ) {
                const now = e.clientX;
                offset = now - start;
                this.move( origin, offset );
                this.dragOffset = offset;
            }
        });

        this.el.addEventListener("mousedown", e => {
            this.inner.classList.add("dragging");

            start = e.clientX;

            const style = window.getComputedStyle( this.inner );
            const matrix = new WebKitCSSMatrix( style.transform );
            origin = matrix.m41;
        });

        const mouseup = e => {
            if(
                start !== null &&
                origin !== null
            ) {
                this.inner.classList.remove("dragging");
                this.goto( this.getCurrentPage() );

                start = null;
                origin = null;
                offset = 0;
                this.dragOffset = 0;
            }
        };

        document.addEventListener("mouseup", mouseup);
        // this.el.addEventListener("mouseout", mouseup);
    }

    move( origin, offset ) {
        this.currentX = origin + offset;
        this.inner.style.transform = `translateX(${ this.currentX }px)`;
    }

    getCurrentPage() {
        let page = Math.floor( this.currentX / this.width );

        if( Math.abs( this.dragOffset ) >= (this.width * this.config.threshold) ) {
            if( this.dragOffset < 0 ) {
                page --;
            }
        } else {
            if( this.dragOffset > 0 ) {
                page --;
            }
        }

        if( page >= 0 ) page = -1;
        if( page < this.maxPage ) page = this.maxPage;

        return this.config.currentPage = page;
    }

    goto( page ) {
        if( page >= 0 ) page = -1;
        if( page < this.maxPage ) page = this.maxPage;

        this.config.currentPage = page;
        this.move( (page + 1) * this.width, 0 );
    }

    next() {
        let page = this.config.currentPage - 1;
        if( page < this.maxPage ) page = -1;

        this.goto( page );
    }

    prev() {
        this.goto( this.config.currentPage + 1 );
    }

    registerAutoplayInterval() {
        setInterval(() => {
            this.next();
        }, this.config.interval );
    }
}