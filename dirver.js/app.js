const createDOM = (inner) => {
    const div = document.createElement("div");
    div.innerHTML = inner;
    return div.firstElementChild;
}

const info = [
    "#highlight-1",
    "#highlight-2",
    "#highlight-3",
    "#highlight-4",
    "#highlight-5",
];

let gap = 10, index = -1, overlay = null, tray = null, pre = null;

function init() {
    if( overlay || tray ) return;

    const style = createDOM(`
    <style>
        .highlight-parent {
            z-index: 0;
        }
        
        .highlight-item {
            position: relative;
            z-index: 10000002;
        }
        
        .hl-tray {
            position: absolute;
            background: #FFF;
            z-index: 10000001;
            transition: all .3s;;
        }
        
        .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000000;
        }
    </style>
`);
    overlay = createDOM(`<div class="overlay"></div>`);
    tray = createDOM(`<div class="hl-tray"></div>`);

    document.body.appendChild( overlay );
    document.body.appendChild( tray );
    document.head.appendChild( style );
}

function apply() {
    init();

    if( pre ) {
        pre.classList.remove("highlight-item");
        pre.parentNode.classList.add("highlight-parent");
    }

    const selector = info[ index ];
    const el = pre = document.querySelector( selector );

    el.parentNode.classList.add("highlight-parent");
    el.classList.add("highlight-item");

    const rect = el.getBoundingClientRect();

    tray.style.width = rect.width + 2 * gap  + 'px';
    tray.style.height = rect.height + 2 * gap + 'px';
    tray.style.transform = `translate(${ rect.left - gap }px, ${ rect.top - gap }px)`;
}

function next() {
    index ++;
    apply();
}

function prev() {
    index --;
    apply();
}
next();

// 原理：
// 1. 对于要高亮的元素添加 relative, 其父元素添加 z-index: auto;
// 2. 夹在中间