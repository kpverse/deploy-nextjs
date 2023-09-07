import { createInterface } from "readline";

export const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function askQuestion(question: string) {
    let answer: string = await new Promise(function (resolve) {
        readlineInterface.question(question, resolve);
    });

    return answer;
}
