export default function interact(el=document.body, mode ) {
    el.addEventListener("mousemove", function( e ) {
        const x = Math.floor( e.clientX / mode.size );
        const y = Math.floor( e.clientY / mode.size );

        game.event.emit("move", x, y );
    });

    el.addEventListener("click", function( e ) {
        const x = Math.floor( e.clientX / mode.size );
        const y = Math.floor( e.clientY / mode.size );

        game.event.emit("click", x, y );
    });

    el.addEventListener("contextmenu", function( e ) {
        e.preventDefault();

        const x = Math.floor( e.clientX / mode.size );
        const y = Math.floor( e.clientY / mode.size );

        game.event.emit("right", x, y );
    });
}