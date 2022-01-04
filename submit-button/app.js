let index = 0;

class Timeline {
    constructor( wrap=document.body ) {
        this.wrap = wrap;
        this.frames = [];
    }

    add( config ) {
        this.frames.push( config );
        return this;
    }

    getEl( selector ) {
        if( selector instanceof HTMLElement ) return selector;
        if( selector === "&" ) return this.wrap;

        return this.wrap.querySelector( selector );
    }

    play() {
        let myIndex = index++;
        let frame = this.frames.shift();
        if( ! frame ) return;

        const el = this.getEl( frame.el );
        const duration = frame.duration || 500;

        delete frame.el;
        delete frame.duration;

        const dict = {
            borderRadius: "border-radius",
            backgroundColor: "background-color",
            strokeDashoffset: "stroke-dashoffset",
        };

        el.style.transition = Object.keys(frame)
            .map( key => dict[key] || key )
            .map( key => `${ key } ${ duration }ms` )
            .join(", ");

        for(let prop in frame) {
            el.style[ prop ] = frame[ prop ]
        }

        setTimeout(() => {
            this.play();
        }, duration );
    }
}

const timeline = new Timeline(
    document.querySelector(".submit-button")
);

timeline
    .add({
        el: ".text",
        duration: 1,
        opacity: 0
    })
    .add({
        el: "&",
        duration: 500,
        height: "10px",
        width: "320px",
    })
    .add({
        el: ".progress",
        duration: 500,
        width: "320px",
    })
    .add({
        el: ".progress",
        duration: 1,
        opacity: 0,
    })
    .add({
        el: "&",
        duration: 500,
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#71DFBE",
    })
    .add({
        el: "path",
        duration: 500,
        strokeDashoffset: 0
    });

document.querySelector(".submit-button").addEventListener("click", e => {
    timeline.play();
});