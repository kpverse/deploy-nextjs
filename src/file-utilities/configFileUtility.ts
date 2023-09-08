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
            '/** @type {import("@kpverse/deploy-nextjs").NextDeployConfig} */\nmodule.exports = {\n    BuildFolderPath: {\n        type: "RELATIVE",\n        path: "./out",\n    },\n    // DeploymentRepoPath: {\n    //     type: "RELATIVE",\n    //     path: "<TARGET_REPO_PATH>",\n    // },\n    // askBeforeCommit: true,\n    // askToChangeEnvVariables: true,\n};'
        );

        console.log(
            `\nA configuration file for "deploy-nextjs" is created at ${chalk.greenBright(
                configFilePath
            )}.\nPlease re-run the previous command after you provide necessary information in the configuration file.`
        );

        process.exit();
    }
    let {
        DeploymentRepoPath,
        BuildFolderPath,
        askBeforeCommit,
        askToChangeEnvVariables,
    }: NextDeployConfig = (await import(configFilePath)).default;

    if (DeploymentRepoPath === undefined) {
        console.log(
            `\n${chalk.red("ERROR:")} No "${chalk.blue(
                "DeploymentRepoPath"
            )}" property provided in "${chalk.greenBright(configFilePath)}".`
        );
        process.exit();
    }

    let configuration: {
        DeploymentRepoPath: string;
        BuildFolderPath: string;
        askBeforeCommit: boolean;
        askToChangeEnvVariables: boolean;
    } = {
        DeploymentRepoPath:
            DeploymentRepoPath.type === "RELATIVE"
                ? resolve(DeploymentRepoPath.path)
                : DeploymentRepoPath.path,
        BuildFolderPath: (function () {
            let newPath = "";
            if (BuildFolderPath === undefined) {
                newPath = resolve("./out");
                console.log(
                    `\n${chalk.yellowBright(
                        "ATTENTION REQUIRED:"
                    )} Considering ${chalk.blue(
                        newPath
                    )} as default build folder path. You can change it in config file (${chalk.greenBright(
                        configFilePath
                    )}).`
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
            `\n${chalk.red("ERROR:")} ${chalk.greenBright(
                configuration.DeploymentRepoPath
            )} does not exist. You can change it in configuration file (${chalk.greenBright(
                configFilePath
            )}).`
        );
        process.exit();
    }

    if (!DeploymentRepoStatus) {
        console.log(
            `\n${chalk.red("ERROR:")} ${chalk.blue(
                "DeploymentRepoPath"
            )} property provided in configuration file (${chalk.greenBright(
                configFilePath
            )}) is not a repository.`
        );
        process.exit();
    }

    return {
        configFilePath,
        ...configuration,
    };
}
