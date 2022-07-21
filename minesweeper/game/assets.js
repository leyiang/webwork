function loadImage( src ) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = src;
    });
}

const list = [
    loadImage("../assets/flag_icon.png"),
];

export default function() {
    const re = /([a-zA-Z0-9_]+)\.png/i;
    const img_list = {};

    return new Promise(resolve => {
        Promise.all( list ).then( images => {
            images.forEach( image => {
                const result = image.src.match( re );
                if( result[1] ) {
                    img_list[ result[1] ] = image;
                }
            });

            resolve( img_list );
        });
    });
}
