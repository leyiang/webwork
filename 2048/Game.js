class Game {
    constructor( container ) {
        this.append = [];
        this.remove = [];

        this.container = container;
        this.moved = false;

        this.init();
    }

    init() {
        this.grid = [];
        window.game = this;

        for (let x = 0; x < 4; x++) {
            this.grid.push(Array(4).fill(null));
        }

        // this.insertAt(0, 1, 2);
        // this.insertAt(2, 1, 2);
        // this.insertAt(1, 1, 2);
        // this.insertAt(0, 3, 2);
        // this.insertAt(1, 1, 4);
        // this.insertAt(1, 0, 2);
        // this.insertAt(1, 1, 4);
        // this.insertAt(2, 2, 2);

        this.randomInsert();
        this.randomInsert();

        this.listen();
    }

    listen() {
        let pressing = false;

        window.addEventListener("keydown", e => {
            const { key } = e;

            if( ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(key) ) {
                e.preventDefault();

                if( pressing ) return;
                pressing = true;
                setTimeout(() => {
                    pressing = false;
                }, 100 );

                const left = {
                    "ArrowUp": true,
                    "ArrowDown": false,
                    "ArrowLeft": true,
                    "ArrowRight": false,
                }[ key ];

                const col = {
                    "ArrowUp": true,
                    "ArrowDown": true,
                    "ArrowLeft": false,
                    "ArrowRight": false,
                }[ key ];

                this.swipe( left, col );
            }
        });
    }

    swipe(left=true, col=true) {
        if( col ) this.rowToCol();
        this.move( left, col )
            .merge( left );
        if( col ) this.rowToCol();

        this.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col) {
                    this.setPos( col.el, col.x, col.y );
                }
            });
        });

        this.appendCell();
        this.removeCell();

        if( col ) this.rowToCol();
        this.move( left, col );
        if( col ) this.rowToCol();

        this.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col) {
                    this.setPos( col.el, col.x, col.y );
                }
            });
        });

        if( this.moved ) {
            setTimeout(() => {
                if( this.grid.flat().filter(el => el).length === 16 ) {
                    alert("You Lose!");
                    return;
                }
                this.randomInsert();
            }, 200 );
        }

        this.moved = false;
    }

    randomInsert(assert=true) {
        let val = Math.random() < .95 ? 2 : 4;

        do {
            let [x, y] = randomPos();
            let cell = this.grid[y][x];

            if (!cell) {
                return this.insertAt(x, y, val);
            }
        } while (assert);
    }

    appendCell() {
        this.append.forEach( info => {
            this.insertAt( info.x, info.y, info.val, true );
        });

        this.append = [];
    }

    removeCell() {
        this.remove.forEach( info => {
            console.log( info );
            const [ cur, next ] = info.cells;

            next.el.addEventListener("transitionend", function() {
                cur.el.remove();
                next.el.remove();
            });

            this.setPos( cur.el, info.to.x, info.to.y );
            this.setPos( next.el, info.to.x, info.to.y );
        });

        this.remove = [];
    }

    insertAt(x, y, val, merge=false) {
        if( this.grid[y][x] ) return;

        const cell = this.grid[y][x] = {
            x, y, val,
            el: this.createCell(val, x, y)
        };

        if( merge ) cell.el.classList.add("merge");
        return this.container.appendChild(cell.el);
    }

    createCell(val, x, y) {
        const el = document.createElement("div");

        el.classList.add("cell", "just-insert");
        el.setAttribute("data-value", val);

        this.setPos( el, x, y );
        return el;
    }

    setPos( el, x, y ) {
        el.style.top = y * 100 + (y + 1) * 16 + "px";
        el.style.left = x * 100 + (x + 1) * 16 + "px";
    }

    rowToCol() {
        let result = [];

        this.grid.forEach((row, y) => {
            row.forEach((col, x) => {
                if (!result[x]) result[x] = [];
                result[x].push(col);
            });
        });

        this.grid = result;

        return this;
    }


    move( left=true, col=true ) {
        this.grid = this.grid.map((row, y) => {
            row = left
                ? row.filter(cell => cell).concat(Array(4).fill(null)).slice(0, 4)
                : Array(4 ).fill(null).concat(row.filter(cell => cell)).slice(-4);

            row.forEach( (cell, x) => {
                if( cell ) {
                    let rx = col ? y : x;
                    let ry = col ? x : y;

                    if( cell.x !== rx || cell.y !== ry ) {
                        cell.x = rx;
                        cell.y = ry;
                        this.moved = true;
                    }
                }
            });

            return row;
        });

        return this;
    }

    merge( left=true ) {
        this.grid = this.grid.map(row => {
            if( left ) {
                for(let i = 0; i < row.length - 1; i++) {
                    const cur = row[i], next = row[i+1];

                    if( cur && next && cur.val === next.val ) {
                        this.moved = true;
                        this.remove.push({
                            to: cur,
                            cells: [ cur, next ]
                        });

                        const newAdd = cur;
                        newAdd.val *= 2;
                        this.append.push( newAdd );

                        row[i] = null;
                        row[i+1] = null;
                        i++;
                    }
                }
            } else {
                for(let i = row.length - 1; i > 0; i--) {
                    const cur = row[i], next = row[i-1];

                    if( cur && next && cur.val === next.val ) {
                        this.moved = true;

                        this.remove.push({
                            to: cur,
                            cells: [ cur, next ]
                        });

                        const newAdd = cur;
                        newAdd.val *= 2;
                        this.append.push( newAdd );

                        row[i] = null;
                        row[i-1] = null;
                        i--;
                    }
                }
            }

            return row;
        });

        return this;
    }
}