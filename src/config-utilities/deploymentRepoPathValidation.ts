import chalk from "chalk";
import { PathObj } from "../types/PathObj.type";
import { resolve } from "path";
import { isRepo } from "../file-utilities/fileType";
import { readlineInterface } from "../askQuestion";

export default function deploymentRepoPathValidation(
    deploymentRepoPath: PathObj,
    configFilePath: string
) {
    if (deploymentRepoPath === undefined) {
        console.log(
            `\n${chalk.red("ERROR:")} No "${chalk.blue(
                "deploymentRepoPath"
            )}" property provided in "${chalk.greenBright(configFilePath)}".`
        );

        readlineInterface.close();
        process.exit();
    }

    if (typeof deploymentRepoPath.path === "string") {
        let deploymentRepoPathValue =
                deploymentRepoPath.type === "RELATIVE"
                    ? resolve(deploymentRepoPath.path)
                    : deploymentRepoPath.path,
            deploymentRepoStatus = isRepo(deploymentRepoPathValue);

        if (deploymentRepoStatus === "PATH_DO_NOT_EXIST") {
            console.log(
                `\n${chalk.red(
                    "ERROR:"
                )} The deployment repository path ${chalk.greenBright(
                    deploymentRepoPathValue
                )} does not exist. You can modify it in the configuration file at "${chalk.greenBright(
                    configFilePath
                )}".`
            );

            readlineInterface.close();
            process.exit();
        }

        if (deploymentRepoStatus === "NO") {
            console.log(
                `\n${chalk.red("ERROR:")} ${chalk.blue(
                    "deploymentRepoPath"
                )} in the configuration file at "${chalk.greenBright(
                    configFilePath
                )}" is not a repository.`
            );

            readlineInterface.close();
            process.exit();
        }

        return deploymentRepoPathValue;
    }

    console.log(
        `\nERROR: Missing or improperly provided "${chalk.blue(
            "deploymentRepoPath"
        )}" property in "${chalk.greenBright(
            configFilePath
        )}".\n\nThe "${chalk.blue(
            "deploymentRepoPath"
        )}" property should be defined as follows:\n\n${chalk.blue(
            "deploymentRepoPath"
        )}: {\n${chalk.blue("type")}: <"RELATIVE" | "ABSOLUTE">,\n${chalk.blue(
            "path"
        )}: <string>\n}\n`
    );

    readlineInterface.close();
    process.exit();
}
