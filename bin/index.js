#! /usr/bin/env node
const fs = require('fs');
const yargs = require("yargs");
// console.log("Hello World!");
// if(yargs.argv._[0] == null){
//     utils.showHelp();
//     return;
// }

// var sentence = parseSentence(yargs.argv._);
// sa
const parameters = yargs.argv._;
if (parameters[0]) {
    if (parameters[0] === 'component') {
        let componentName = parameters[1].split('/');
        componentName = componentName[componentName.length - 1];
        const path = 'src/' + parameters[1].substr(0, parameters[1].length - componentName.length) + componentName + '/';
        if (path) {
            fs.mkdir(path, {recursive: true}, (err) => {
                if (err) throw err;
                createComponentFiles(path);
            });
        }
    }
    if (parameters[0] === 'read') {
        fs.readFile('src/app.module.ts', 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(data)
        })
    }
}



function createComponentFiles(path) {
    fs.writeFile(path + componentName + ".component.ts",
        `import {Component} from "../../@cinera/component";

@Component({
    selector: 'app-${componentName}',
    templateUrl: '${componentName}.component.html',
    styleUrl: '${componentName}.component.css'
}, '${componentName}')
export class ${capitalizeFirstLetter(componentName)}Component {

    constructor() {
    }
}`,
        function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    fs.writeFileSync(path + componentName + '.component.css', ``);
    fs.writeFileSync(path + componentName + '.component.html', `<p>${capitalizeFirstLetter(componentName)} Component works!</p>`);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// const usage = "\nUsage: tran <lang_name> sentence to be translated";const options = yargs
//     .usage(usage)
//     .option("l", {alias:"languages", describe: "List all supported languages.", type: "boolean", demandOption
// : false })
// .help(true)
//     .argv;
// console.log(usage);


// function parseSentence(words) {
//     var sentence = "";
//     for (var i = 1; i < words.length; i++) {
//         sentence = sentence + words[i] + " ";
//     }
//
//     return sentence;
// }
//
//     const usage = "\nUsage: tran <lang_name
//         > sentence to be translated";
//     function showHelp() {
//         console.log(usage);
//         console.log('\nOptions:\r')
//         console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')
//         console.log('    -l, --languages\t' + '      ' + 'List all languages.' + '\t\t' + '[boolean]\r')
//         console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')
//     }
