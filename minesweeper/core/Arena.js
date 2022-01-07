import Cell from "./Cell.js";

export default class Arena {
    constructor( { col, row, mine }) {
        this.col = col;
        this.row = row;
        this.mine = mine;

        this.initialized = false;

        this.cells = [];

        for(let y = 0; y < this.row; y++) {
            for(let x = 0; x < this.col; x++) {
                this.cells.push( new Cell(x, y) );
            }
        }

        this.init();
    }

    init() {
        game.event.on("click", (x, y) => {
            // Generate Arena
            this.initArena( x, y );

            let origin = this.get( x, y );
            if( ! origin ) return;
            if( origin.open ) return;
            if( origin.flag ) return;

            this.click( origin );
        });

        game.event.on("right", (x, y) => {
            this.initArena();
            this.mark( x, y );
        });
    }

    initArena(x, y) {
        if( ! this.initialized ) {
            this.initialized = true;
            this.generate(x, y);
        }
    }

    generate(x, y) {
        this.placeMine(x, y);
        this.count();
    }

    placeMine(x, y) {
        let forbid = [ y * this.col + x ];
        forbid.push( ...this.getAround( forbid[0], true ) );

        let i = 0,
            num = this.mine,
            len = this.cells.length;

        if( (len - forbid.length) < num ) throw new Error("Wrong");

        while( i < num ) {
            let index = rand( len );
            if( forbid.includes(index) ) continue;
            if( this.cells[index].val === "*" ) continue;

            this.cells[ index ].val = "*";
            i++;
        }
    }

    count() {
        this.cells.forEach( (cell, i) => {
            if( cell.val === "*" ) return;

            cell.val = this.getAround( i, true )
                .map( i => this.cells[i] )
                .filter( cell => cell.val === "*" )
                .length || 0;

            return 0;
        });
    }

    getAround( index, corner=false ) {
        let col = this.col;

        let around = [];

        let veryLeft = index % this.col === 0,
            veryRight = (index + 1) % this.col === 0,
            veryTop = Math.floor(index / this.col) === 0,
            veryBottom = Math.floor(index / this.col) === (this.row-1);

        if( ! veryLeft ) around.push( index - 1 );
        if( ! veryRight ) around.push( index + 1 );
        if( ! veryTop ) around.push( index - col );
        if( ! veryBottom ) around.push( index + col );

        if( corner ) {
            if( ! veryRight && ! veryTop ) around.push( index + 1 - col );
            if( ! veryRight && ! veryBottom ) around.push( index + 1 + col );

            if( ! veryLeft && ! veryTop ) around.push( index - 1 - col );
            if( ! veryLeft && ! veryBottom ) around.push( index - 1 + col );
        }

        return around;
    }

    get(x, y) {
        if( x < 0 || y < 0 || y > this.row || x > this.col ) return null;
        return this.cells[ y * this.col + x ];
    }

    mark( x, y ) {
        const cell = this.get( x, y );
        if( ! cell ) return;
        if( cell.open ) return;

        cell.flag = ! cell.flag;
    }

    floodFill(x, y) {
        let res = [ this.get(x, y) ];
        let list = [ [x, y] ];
        let visited = [ x + "_" + y ];

        while( list.length ) {
            let item = list.shift();
            this.getAround( this.XYToIndex(item[0], item[1]), true  )
                .map( index => this.indexToXY(index) )
                .forEach( around => {
                    let key = around[0] + "_" + around[1];
                    if( visited.includes(key) ) return;
                    visited.push( key );

                    let cell = this.get( around[0], around[1] );

                    res.push( cell );

                    if( cell.val === 0 ) {
                        list.push( around );
                    }
                });
        }

        res.forEach( cell => cell.open = true );

        if( res.length > 1 ) {
            game.canvas.classList.add("shake");
            game.canvas.addEventListener("animationend", e => {
                e.target.classList.remove("shake");
            });
        }

        return res;
    }

    indexToXY( index ) {
        const y = Math.floor( index / this.col );
        const x = index - (y * this.col);
        return [x, y];
    }

    XYToIndex( x, y ) {
        return y * this.col + x;
    }

    click(origin ) {
        if( origin.val === "*" ) {
            this.lose();
        } else if( ! origin.open ) {
            this.reveal( origin );
        }
    }

    lose() {
        alert("Lose");
    }

    reveal( origin ) {
        let list = [ origin ];

        if( origin.val === 0 ) {
            list = this.floodFill( origin.x, origin.y );
        } else {
            origin.open = true;
        }

        list.forEach( cell => {
            cell.reveal();
        });
    }
}