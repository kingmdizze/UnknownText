import Tokens from "./Letters";

export type LexToken = {
    value: (typeof Tokens)[keyof typeof Tokens];
    isSmall: boolean;
};

const isSmall = (char: string): boolean => {
    return char === char.toLowerCase();
};

export function GenToken(value: string, isSmall: boolean): LexToken {
    return { value: value, isSmall: isSmall };
}

export default function Lex(input: string): LexToken[] {
    // Split text by character
    const split = input.split("");
    const tokens: LexToken[] = [];

    while (split.length > 0) {
        const char = split.shift() as string;
        const token = GenToken(char, isSmall(char));

        tokens.push(token);
    }

    return tokens;
}
