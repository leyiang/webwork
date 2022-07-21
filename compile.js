const fs = require("fs");

function getComponent( name ) {
    return `
        <a href="/${name}" class="project-item">
            <span>${ name }</span>
        </a>
    `;
}

const folders = fs.readdirSync("./src")

const raw = folders.map( folder => {
    return getComponent(folder);
});


fs.readFile("template.html", "utf-8", function(err, data) {
    if( err ) {
        return console.log( err );
    }

    const result = data.replace("<!--project-->", raw.join('') );

    fs.writeFile("./src/index.html", result, "utf-8", function(err) {
        if( err ) {
            console.log( err );
        }
    });
});