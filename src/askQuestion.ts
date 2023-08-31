import { createInterface } from "readline";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function askQuestion(
    question: string,
    answerToExit: "YES" | "NO"
) {
    let answer: string = await new Promise(function (resolve) {
        readline.question(`${question} [Y|N]: `, resolve);
    });

    answer = answer.toLowerCase();

    if (["y", "n"].includes(answer)) {
        if (answer === "y" && answerToExit === "YES") process.exit();
        if (answer === "n" && answerToExit === "NO") process.exit();
    } else {
        console.log('Please answer "y" or "n".');
        await askQuestion(question, answerToExit);
    }
}
