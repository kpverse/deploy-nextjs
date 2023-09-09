import chalk from "chalk";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { NextDeployConfig } from "../types";
import { checkIfPathExists } from "./checkIfPathExists";
import { isRepo } from "./fileType";

export async function configFileUtility() {
    let configFilePath = resolve("./deploy-nextjs.config.js"),
        fileExists = checkIfPathExists(configFilePath);

    if (!fileExists) {
        writeFileSync(
            configFilePath,
            `/** @type {import("@kpverse/deploy-nextjs").NextDeployConfig} */
module.exports = {
        BuildFolderPath: {
            type: "RELATIVE",
        path: "./out",
    },
    // DeploymentRepoPath: {
        //     type: "RELATIVE",
    //     path: "<TARGET_REPO_PATH>",
    // },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};`
        );

        console.log(
            `\nA configuration file for "deploy-nextjs" has been created at ${chalk.greenBright(
                configFilePath
            )}.\nPlease rerun the previous command after filling in the necessary information in the configuration file.`
        );

        process.exit();
    }
    let {
        DeploymentRepoPath,
        BuildFolderPath,
        askBeforeCommit,
        askToChangeEnvVariables,
    }: NextDeployConfig = (await import(configFilePath)).default;

    let configuration = {
        DeploymentRepoPath: (function () {
            if (DeploymentRepoPath === undefined) {
                console.log(
                    `\n${chalk.red("ERROR:")} No "${chalk.blue(
                        "DeploymentRepoPath"
                    )}" property provided in "${chalk.greenBright(
                        configFilePath
                    )}".`
                );
                process.exit();
            }

            if (typeof DeploymentRepoPath.path === "string")
                return DeploymentRepoPath.type === "RELATIVE"
                    ? resolve(DeploymentRepoPath.path)
                    : DeploymentRepoPath.path;

            console.log(
                `\nERROR: Missing or improperly provided "${chalk.blue(
                    "DeploymentRepoPath"
                )}" property in "${chalk.greenBright(configFilePath)}".

The "${chalk.blue("DeploymentRepoPath")}" property should be defined as follows:

${chalk.blue("DeploymentRepoPath")}: {
    ${chalk.blue("type")}: <"RELATIVE" | "ABSOLUTE">,
    ${chalk.blue("path")}: <string>
}
`
            );

            process.exit();
        })(),
        BuildFolderPath: (function () {
            let newPath = "";
            if (BuildFolderPath === undefined) {
                newPath = resolve("./out");
                console.log(
                    `\n${chalk.yellowBright(
                        "ATTENTION REQUIRED:"
                    )} Using ${chalk.blue(
                        newPath
                    )} as the default build folder path. You can modify it in the config file at "${chalk.greenBright(
                        configFilePath
                    )}".`
                );
                return newPath;
            }
            return BuildFolderPath.type === "RELATIVE"
                ? resolve(BuildFolderPath.path)
                : BuildFolderPath.path;
        })(),
        askBeforeCommit:
            askBeforeCommit === undefined ||
            typeof askBeforeCommit !== "boolean"
                ? true
                : askBeforeCommit,
        askToChangeEnvVariables:
            askToChangeEnvVariables === undefined ||
            typeof askToChangeEnvVariables !== "boolean"
                ? true
                : askToChangeEnvVariables,
    };

    let DeploymentRepoStatus = isRepo(configuration.DeploymentRepoPath);

    if (DeploymentRepoStatus === undefined) {
        console.log(
            `\n${chalk.red(
                "ERROR:"
            )} The deployment repository path ${chalk.greenBright(
                configuration.DeploymentRepoPath
            )} does not exist. You can modify it in the configuration file at "${chalk.greenBright(
                configFilePath
            )}".`
        );
        process.exit();
    }

    if (!DeploymentRepoStatus) {
        console.log(
            `\n${chalk.red("ERROR:")} ${chalk.blue(
                "DeploymentRepoPath"
            )} in the configuration file at "${chalk.greenBright(
                configFilePath
            )}" is not a repository.`
        );
        process.exit();
    }

    return {
        configFilePath,
        ...configuration,
    };
}
