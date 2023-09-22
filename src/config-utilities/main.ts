import chalk from "chalk";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { NextDeployConfig } from "../types/NextDeployConfig";
import { checkIfPathExists } from "../file-utilities/checkIfPathExists";
import deploymentRepoPathValidation from "./deploymentRepoPathValidation";
import buildFolderPathValidation from "./buildFolderPathValidation";
import { readlineInterface } from "../askQuestion";

export async function configFileUtility() {
    let configFilePath = resolve("./deploy-nextjs.config.js"),
        fileExists = checkIfPathExists(configFilePath);

    if (fileExists === "NO") {
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

        readlineInterface.close();
        process.exit();
    }
    let {
        deploymentRepoPath,
        buildFolderPath,
        askBeforeCommit,
        askToChangeEnvVariables,
    }: NextDeployConfig = (await import(configFilePath)).default;

    const askToChangeEnvVariablesValue =
        askToChangeEnvVariables === undefined ||
        typeof askToChangeEnvVariables !== "boolean"
            ? true
            : askToChangeEnvVariables;

    const configuration = {
        deploymentRepoPath: deploymentRepoPathValidation(
            deploymentRepoPath,
            configFilePath
        ),

        askBeforeCommit:
            askBeforeCommit === undefined ||
            typeof askBeforeCommit !== "boolean"
                ? true
                : askBeforeCommit,

        askToChangeEnvVariables: askToChangeEnvVariablesValue,

        buildFolderPath: await buildFolderPathValidation(
            buildFolderPath,
            configFilePath,
            askToChangeEnvVariablesValue
        ),
    };

    return {
        configFilePath,
        ...configuration,
    };
}
