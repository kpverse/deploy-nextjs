import { resolve } from "path";
import { PathObj } from "../../types/PathObj.type";
import chalk from "chalk";
import { askQuestion, readlineInterface } from "../../askQuestion";
import { checkIfPathExists } from "../../file-utilities/checkIfPathExists";
import { buildProcess } from "../../buildProcess";

export default async function buildFolderPathValidation(
    buildFolderPath: PathObj | undefined,
    configFilePath: string,
    askToChangeEnvVariables: boolean
) {
    let buildFolderPathValue = "";

    if (buildFolderPath === undefined) {
        console.log(
            `\n${chalk.yellowBright("ATTENTION REQUIRED:")} Using ${chalk.blue(
                buildFolderPathValue
            )} as the default build folder path. You can modify it in the config file at "${chalk.greenBright(
                configFilePath
            )}".`
        );
        buildFolderPathValue = resolve("./out");
    } else {
        buildFolderPathValue =
            buildFolderPath.type === "RELATIVE"
                ? resolve(buildFolderPath.path)
                : buildFolderPath.path;
    }

    let buildFolderPathStatus = checkIfPathExists(buildFolderPathValue);

    if (buildFolderPathStatus === "NO") {
        let answer = (
            await askQuestion(
                `\nBuild folder path (${chalk.blue(
                    buildFolderPath
                )}) does not exist.\nWould you like to start build process? [y/n]: `
            )
        ).toLowerCase();

        while (!["y", "n"].includes(answer))
            answer = (
                await askQuestion("\nPlease enter 'y' or 'n': ")
            ).toLowerCase();

        if (answer === "n") {
            readlineInterface.close();
            process.exit();
        } else if (answer === "y") await buildProcess(askToChangeEnvVariables);
    } else await buildProcess(askToChangeEnvVariables);

    buildFolderPathStatus = checkIfPathExists(buildFolderPathValue);

    if (buildFolderPathStatus === "NO") {
        console.log(
            `\n${chalk.red("ERROR:")} The build folder at (${chalk.blue(
                buildFolderPath
            )}) does not exist. Please ensure you've provided the correct configuration in ${chalk.greenBright(
                configFilePath
            )}.`
        );
        readlineInterface.close();
        process.exit();
    }

    return buildFolderPathValue;
}
