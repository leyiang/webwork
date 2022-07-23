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

    audio.analyzer.fftSize = 128;
    const bufferLength = audio.analyzer.frequencyBinCount;
    audio.data = new Uint8Array(bufferLength);

    audio.stream.play();
});

function animate() {
    if( audio.analyzer ) {
        audio.analyzer.getByteFrequencyData( audio.data );
    }

    const color = c.createLinearGradient(0, 0, 0, 300);
    color.addColorStop(1, '#0f00f0');
color.addColorStop(0.5, '#ff0ff0');
color.addColorStop(0, '#f00f00');

    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    let gap = 1;
    if( audio.data ) {
        let width = canvas.width / audio.data.length;
        c.fillStyle = color;
        // c.fillStyle = "#FFF";

        for(let i = 0; i < audio.data.length; i++) {
            const val = audio.data[ i ];
            c.fillRect(i * width + (i-1) * gap, 400 - val, width, val);
        }
    }

    requestAnimationFrame( animate );
}

animate();