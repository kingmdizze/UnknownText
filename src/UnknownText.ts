import chalk from "chalk";
import Lex from "./Lexer";
import Parse from "./Parser";
import readline from "readline";
import { readFileSync } from "fs";

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getContentInFile(path: string) {
    let result = "";
    try {
        const data = readFileSync(path, "utf8");
        result = data;
    } catch (err) {
        result = "";
    }

    return result;
}

rlInterface.question(
    chalk.yellowBright("> Text oder Dateinamen eingeben:"),
    async function (ans) {
        const contentInFile = await getContentInFile(ans);

        const tokens = Lex(contentInFile === "" ? ans : contentInFile);

        // console.log(chalk.blueBright("Parse tokens"));
        const final = Parse(tokens);

        console.log(chalk.yellowBright("Generierter Text:"));
        console.log(chalk.blueBright(final));

        console.log(
            chalk.redBright(`\n\nStrg+C drücken um Programm zu schließen.`)
        );
    }
);
