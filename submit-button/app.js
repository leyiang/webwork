let index = 0;

class Timeline {
    constructor(wrap = document.body) {
        this.wrap = wrap;
        this.frames = [];
        this.playing = false;
    }

    add(config) {
        this.frames.push(config);
        return this;
    }

    getEl(selector) {
        if (selector instanceof HTMLElement) return selector;
        if (selector === "&") return this.wrap;

        return this.wrap.querySelector(selector);
    }

    play() {
        if( this.playing ) return;
        this.playing = true;
        this.tick();
    }

    tick() {
        let frame = this.frames.shift();
        if (!frame) return;

        const el = this.getEl(frame.el);
        const duration = frame.duration || 500;
        const ease = frame.ease || ".28,.17,.4,.99";

        delete frame.el;
        delete frame.ease;
        delete frame.duration;

        const dict = {
            borderRadius: "border-radius",
            backgroundColor: "background-color",
            strokeDashoffset: "stroke-dashoffset",
        };

        el.style.transition = Object.keys(frame)
            .map(key => dict[key] || key)
            .map(key => `${key} ${duration}ms cubic-bezier(${ease})`)
            .join(", ");

        for (let prop in frame) {
            el.style[prop] = frame[prop]
        }

        setTimeout(() => {
            this.tick();
        }, duration);
    }
}

const timeline = new Timeline(
    document.querySelector(".submit-button")
);

const sending = () => {
    timeline
        .add({
            el: ".text",
            duration: 1,
            transform: "translateY(10px)",
            opacity: 0
        })
        .add({
            el: "&",
            duration: 500,
            ease: ".37,.02,0,1.52",
            height: "10px",
            width: "320px",
        })
        .add({
            el: ".progress",
            duration: 1500,
            width: "30%",
        }).play();
};

const success = () => {
    timeline
        .add({
            el: ".progress",
            duration: 400,
            width: "100%",
            ease: ".5,.37,0,.8"
        })
        .add({
            el: ".progress",
            duration: 1,
            opacity: 0,
        })
        .add({
            el: "&",
            duration: 400,
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#71DFBE",
            ease: "0,.47,0,1.01"
        })
        .add({
            el: "path",
            duration: 200,
            strokeDashoffset: 0
        })
        .play();
};

document.querySelector(".submit-button").addEventListener("click", e => {
    sending();

    setTimeout(() => {
        success();
    }, 2000);
});