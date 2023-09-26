import { resolve } from "path";
import { checkIfPathExists } from "../../file-utilities/checkIfPathExists";
import chalk from "chalk";
import { readlineInterface } from "../../askQuestion";

export default async function getBasePath() {
    let nextJSConfigFilePath = resolve("./next.config.js"),
        nextJSConfigFilePathStatus = checkIfPathExists(nextJSConfigFilePath);

    if (nextJSConfigFilePathStatus === "NO") {
        console.log(
            `\n${chalk.red("ERROR:")} "${chalk.greenBright(
                "next.config.js"
            )}" file not found at ${chalk.blueBright(resolve("./"))}.`
        );

        readlineInterface.close();
        process.exit();
    }

    let { basePath }: { basePath?: string } = (
        await import(nextJSConfigFilePath)
    ).default;

    return basePath;
}
