const h = inner => {
    const wrap = document.createElement("div");
    wrap.innerHTML = inner;
    return wrap.firstElementChild;
}

class Cursor {
    constructor( options ) {
        const defaultOptions = {
            container: "body",
            ease: "expo.out",
            speed: 0.7,
        };

        this.config = Object.assign( {}, defaultOptions, options );

        this.init();
        this.bind();
    }

    init() {
        this.container = document.querySelector( this.config.container );

        this.el = h(`<div class="cursor"></div>`)
        this.text = h(`<div class="cursor-text"></div>`);

        this.el.appendChild( this.text );
        this.container.appendChild( this.el );

        this.bind();
    }

    bind() {
        this.container.addEventListener("mouseenter", event => {
            const target = event.target;

            if( target === this.container ) {
                this.show();
            }

            if( target.dataset.cursor ) {
                this.el.classList.add( target.dataset.cursor );
            }

            if( target.dataset.text ) {
                this.el.classList.add("text");
                this.text.textContent = target.dataset.text;
            }

            if( target.dataset.stick ) {
                this.el.classList.add("bigger");

                const sticker = document.querySelector( target.dataset.stick );
                const rect = sticker.getBoundingClientRect();

                this.stick = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };
            }
        }, true );

        this.container.addEventListener("mouseleave", event => {
            const target = event.target;

            if( target === this.container ) {
                this.hide();
            }

            if( target.dataset.cursor ) {
                this.el.classList.remove( target.dataset.cursor );
            }

            if( target.dataset.text ) {
                this.el.classList.remove("text");
                this.text.textContent = null;
            }

            if( target.dataset.stick ) {
                this.el.classList.remove("bigger");
                this.stick = null;
            }
        }, true);

        this.container.addEventListener("mousemove", event => {
            const rect = this.el.getBoundingClientRect();

            this.pos = {
                x: this.stick ? this.stick.x - (this.stick.x - event.clientX) * .05 : event.clientX,
                y: this.stick ? this.stick.y - (this.stick.y - event.clientY) * .05 : event.clientY,
            };

            this.pos.x -= rect.width / 2;
            this.pos.y -= rect.height / 2;

            this.move();
        });
    }

    show() {
        this.el.classList.add("visible");
    }

    hide() {
        this.el.classList.remove("visible");
    }

    move() {
        gsap.to( this.el, {
            x: this.pos.x,
            y: this.pos.y,
            ease: this.config.ease,
            force3D: true,
            overwrite: true,
            duration: this.config.speed
        });
    }
}

