import { createInterface } from "readline";

export const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function askQuestion(question: string) {
    let answer: string = await new Promise(function (resolve) {
        readline.question(`\n${question}`, resolve);
    });

    return answer;
}
