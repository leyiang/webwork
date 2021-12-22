class Magnet {
    constructor( options ) {
        const defaultOptions = {
            margin: 10
        };

        this.el = options.el;
        this.mouse = new Vec(0, 0);
        this.margin = options.margin || defaultOptions.margin;

        this.init();
    }

    init() {
        this.initEl();
        this.listen();
        this.loop();
    }

    initEl() {
        this.el.forEach( el => {
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

        this.el.forEach( el => {
            const center = this.getCenterPoint( el );
            const diff = this.mouse.clone().sub( center );

            if(
                this.mouse.x >= (el.rect.left - this.margin) &&
                this.mouse.y >= (el.rect.top - this.margin) &&
                this.mouse.x <= (el.rect.right + this.margin) &&
                this.mouse.y <= (el.rect.bottom + this.margin)
            ) {
                el.style.transform = `translate(${ diff.x }px, ${ diff.y }px)`
            } else {
                el.style.transform = ``;
            }
        });
    }
}