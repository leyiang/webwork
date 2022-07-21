export default class Event {
    constructor() {
        this.events = [];
    }

    on( type, fn ) {
        if( ! this.events[ type ] ) this.events[ type ] = [];
        this.events[ type ].push( fn );
    }

    emit( type, ...args  ) {
        if( ! this.events[ type ] ) return;
        this.events[ type ].forEach( fn => fn( ...args ) );
    }
}