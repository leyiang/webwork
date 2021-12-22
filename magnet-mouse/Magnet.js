class Magnet {
    constructor( options ) {
        const defaultOptions = {
            el: [],
            follow: [],
            margin: 10,
        };

        this.mouse = new Vec(0, 0);

        const config = this.config = {};
        Object.assign( config, defaultOptions, options );

        this.init();
    }

    init() {
        this.initEl();
        this.listen();
        this.loop();
    }

    initEl() {
        [
            ...this.config.el,
            ...this.config.follow
        ].forEach( el => {
            const rect = el.getBoundingClientRect();

            el.rect = {
                top: rect.y,
                left: rect.x,
                right: rect.x + rect.width,
                bottom: rect.y + rect.height,
            };
        });
    }

    listen() {
        document.addEventListener("mousemove", e => {
            this.mouse = new Vec( e.clientX, e.clientY );
        });
    }

    getCenterPoint(el) {
        const rect = el.getBoundingClientRect();

        return new Vec(
            rect.x + rect.width / 2,
            rect.y + rect.height / 2,
        );
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        this.config.el.forEach( el => {
            const center = this.getCenterPoint( el );
            const diff = this.mouse.clone().sub( center );

            if(
                this.mouse.x >= (el.rect.left - this.config.margin) &&
                this.mouse.y >= (el.rect.top - this.config.margin) &&
                this.mouse.x <= (el.rect.right + this.config.margin) &&
                this.mouse.y <= (el.rect.bottom + this.config.margin)
            ) {
                el.style.transform = `translate(${ diff.x }px, ${ diff.y }px)`
            } else {
                el.style.transform = ``;
            }
        });

        this.config.follow.forEach( el => {
            const rect = el.getBoundingClientRect();
            const x = this.mouse.x - rect.width / 2;
            const y = this.mouse.y - rect.height / 2;

            el.style.transform = `translate(${ x }px, ${ y }px)`
        });
    }
}