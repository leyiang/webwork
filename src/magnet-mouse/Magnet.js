class Magnet {
    constructor( el ) {
        this.el = el;
        this.config = {};

        this.bind();
    }

    bind() {
        window.addEventListener("mousemove", event => {
            const rect = this.el.getBoundingClientRect();

            if(
                event.clientX >= rect.left &&
                event.clientY >= rect.top &&
                event.clientX <= rect.left + rect.width &&
                event.clientY <= rect.top + rect.height
            ) {
                const center = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };

                const diff = {
                    x: center.x - event.clientX,
                    y: center.y - event.clientY,
                };

                diff.x *= -.25;
                diff.y *= -.25;

                this.move( diff.x, diff.y );
            } else {
                this.move(0, 0);
            }
        });
    }

    move(x, y) {
        gsap.to( this.el, {
            x, y,
            ease: "expo.out",
            force3D: true,
            overwrite: true,
            duration: .7
        });
    }
}