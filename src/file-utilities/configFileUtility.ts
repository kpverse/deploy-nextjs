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
        buildFolderPath: {
            type: "RELATIVE",
        path: "./out",
    },
    // deploymentRepoPath: {
    //     type: "RELATIVE",
    //     path: "<TARGET_REPO_PATH>",
    // },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};`
        );

        console.log(
            `\nA configuration file for "${chalk.greenBright(
                "@kpverse/deploy-nextjs"
            )}" has been created at ${chalk.greenBright(
                configFilePath
            )}.\nPlease rerun the previous command after filling in the necessary information in the configuration file.`
        );

        process.exit();
    }
    let {
        deploymentRepoPath,
        buildFolderPath,
        askBeforeCommit,
        askToChangeEnvVariables,
    }: NextDeployConfig = (await import(configFilePath)).default;

    let configuration = {
        deploymentRepoPath: (function () {
            if (deploymentRepoPath === undefined) {
                console.log(
                    `\n${chalk.red("ERROR:")} No "${chalk.blue(
                        "deploymentRepoPath"
                    )}" property provided in "${chalk.greenBright(
                        configFilePath
                    )}".`
                );
                process.exit();
            }

            if (typeof deploymentRepoPath.path === "string")
                return deploymentRepoPath.type === "RELATIVE"
                    ? resolve(deploymentRepoPath.path)
                    : deploymentRepoPath.path;

            console.log(
                `\nERROR: Missing or improperly provided "${chalk.blue(
                    "deploymentRepoPath"
                )}" property in "${chalk.greenBright(configFilePath)}".

The "${chalk.blue("deploymentRepoPath")}" property should be defined as follows:

${chalk.blue("deploymentRepoPath")}: {
    ${chalk.blue("type")}: <"RELATIVE" | "ABSOLUTE">,
    ${chalk.blue("path")}: <string>
}
`
            );

            process.exit();
        })(),
        buildFolderPath: (function () {
            let newPath = "";
            if (buildFolderPath === undefined) {
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
            return buildFolderPath.type === "RELATIVE"
                ? resolve(buildFolderPath.path)
                : buildFolderPath.path;
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

    let deploymentRepoStatus = isRepo(configuration.deploymentRepoPath);

    if (deploymentRepoStatus === undefined) {
        console.log(
            `\n${chalk.red(
                "ERROR:"
            )} The deployment repository path ${chalk.greenBright(
                configuration.deploymentRepoPath
            )} does not exist. You can modify it in the configuration file at "${chalk.greenBright(
                configFilePath
            )}".`
        );
        process.exit();
    }

    if (!deploymentRepoStatus) {
        console.log(
            `\n${chalk.red("ERROR:")} ${chalk.blue(
                "deploymentRepoPath"
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
