import Letters, { umlauts } from "./Letters";
import { LexToken } from "./Lexer";

function GetDots(char: string, prefix = false): string {
    let finalDots = "";

    let position = !umlauts.includes(char.toUpperCase())
        ? Letters.indexOf(char.toUpperCase())
        : umlauts.indexOf(char.toUpperCase());
    position += 1;

    if (position < 13) {
        finalDots = prefix ? "[+]" : "";

        for (let i = 0; i < position; i++) {
            finalDots += ".";
        }
    } else {
        finalDots = prefix ? "[-]" : "";

        for (let i = 0; i < position; i++) {
            finalDots += ".";
        }
    }

    return finalDots;
}

export default function Parse(tokens: LexToken[]): string {
    let finalString = "";

    while (tokens.length > 0) {
        const token = tokens.shift() as LexToken;
        const prefix = token?.isSmall ? "<" : ">";

        // Check if it's a normal letter
        if (Letters.includes(token.value.toString().toUpperCase())) {
            finalString += prefix + GetDots(token.value as string, true) + "|";
        } else {
            // Character is smth. strange like: space, ä, +
            switch (token.value.toString().toUpperCase()) {
                case "Ä":
                case "Ö":
                case "Ü":
                    // >{[-+]..|}|
                    finalString +=
                        prefix + `{[-+]${GetDots(token.value.toString())}|}|`;
                    break;
                case ".":
                    finalString += "({[+-]....|})|";
                    break;
                case ",":
                    finalString += "({[+-]...|})|";
                    break;
                case "=":
                    finalString += "({[+-].|})|";
                    break;
                case "!":
                    finalString += "({[+-].....|})|";
                    break;
                case ":":
                    finalString += "({[+-]......|})|";
                    break;
                case "-":
                    finalString += "({[+-].......|})|";
                    break;
                case "(":
                    finalString += "({[+-]........|})|";
                    break;
                case ")":
                    finalString += "({[+-].........|})|";
                    break;

                // Default is space
                default:
                    finalString += "({[+-]..|})|";
            }
        }
    }

    return finalString;
}
