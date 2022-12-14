var Table = require('cli-table');
var chalk  = require('chalk');
const { Book } = require('cli-pages');

var table1 = new Table({ head: ['', chalk.greenBright.bold('Before you deploy'), chalk.greenBright.bold('Description') ]
    , colWidths: [5, 20, 150]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table1.push(
    [ chalk.greenBright.bold('1'), chalk.greenBright.bold('Azure CLI'), chalk.bold('Make sure you have Azure CLI installed on your device.')]
    ,[ chalk.greenBright.bold('2'), chalk.greenBright.bold('Authentication'), chalk.bold('Authenticate using the command line. Use the following command: \n') + chalk.red('az login')]
    , [chalk.greenBright.bold('3'),chalk.greenBright.bold('Image location'), chalk.bold('Make sure the image has already been pushed to the Container Registry. Fetch its URI since it will be needed later.')]
);

let pages = new Book([
    {
        title: "Page 1",
        content: table1.toString(),
    },

]);

function printMap() {
    pages.open();
    pages.close();

}

module.exports = printMap;