const canvas = document.getElementById("screen");
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

const playBTN = document.getElementById("play-btn");

const audio = {
    stream: new Audio(),
    context: null,
    source: null,
    analyzer: null,
    data: null
};

audio.stream.src = "./song.mp3";

playBTN.addEventListener("click", () => {
    audio.context = new AudioContext();
    audio.source = audio.context.createMediaElementSource( audio.stream );
    audio.analyzer = audio.context.createAnalyser();
    audio.source.connect( audio.analyzer );
    audio.analyzer.connect( audio.context.destination );

    audio.analyzer.fftSize = 512;
    const bufferLength = audio.analyzer.frequencyBinCount;
    audio.data = new Uint8Array(bufferLength);

    audio.stream.play();
});

const radius = 200;

function animate() {
    if( audio.analyzer ) {
        audio.analyzer.getByteFrequencyData( audio.data );
    }

//     const color = c.createLinearGradient(0, 0, 0, 300);
//     color.addColorStop(1, '#0f00f0');
// color.addColorStop(0.5, '#ff0ff0');
// color.addColorStop(0, '#f00f00');

    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    const length = 90;
    if( audio.data ) {
        let width = canvas.width / length;
        // c.fillStyle = color;
        c.fillStyle = "#FFF";

        const step = Math.round(audio.data.length / length)
        console.log( step );
        isolateContext(c, () => {
            c.translate(400, 400);
            for(let i = 10; i < length + 10; i++) {
                const val = audio.data[ i ];
                const height = (val + 10) * 150 / 256;
                c.rotate(2 * Math.PI / length);
                c.fillRect(-width / 2, - radius - height, width, height);
            }
        });
    }

    requestAnimationFrame( animate );
}

animate();

function isolateContext(context, isolateContextCallback) {
    context.save();
    context.beginPath();
    isolateContextCallback( context );
    context.closePath();
    context.restore();
}
