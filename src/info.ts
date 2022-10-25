
function info() {
    var Table = require('cli-table');
    var chalk  = require('chalk');
    const { Book } = require('cli-pages');

    var table1 = new Table({ head: ['', chalk.greenBright.bold('Things to do'), chalk.greenBright.bold('Description') ]
        , colWidths: [5, 20, 150]
    });

// table is an Array, so you can `push`, `unshift`, `splice` and friends
    table1.push(
        [ chalk.greenBright.bold('1'), chalk.greenBright.bold('Project Directory'), chalk.bold('Go to the project directory. \n You do not need to be in the project directory to deploy, however it is recommended.')]
        ,[ chalk.greenBright.bold('2'), chalk.greenBright.bold('Deploy'), chalk.bold('Use ') + chalk.green('s26r up') + chalk.bold(' to deploy the project.')]
        , [chalk.greenBright.bold('3'),chalk.greenBright.bold('Logs'), chalk.bold('The deployment logs can be viewed using ') + chalk.green('s26r logs') + chalk.bold('.')]
        , [chalk.greenBright.bold('4'),chalk.greenBright.bold('History'), chalk.bold('This tool stores all the deployment parameters in the ') + chalk.green('s26r.yml') + chalk.bold(' file in the project directory(or the directory you deploy the project from).')]
    );

    let pages = new Book([
        {
            title: "Page 1",
            content: table1.toString(),
        },

    ]);
    pages.open();
    pages.close();

}

module.exports = info;