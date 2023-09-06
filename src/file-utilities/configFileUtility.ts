import { writeFileSync } from "fs";
import { checkIfPathExists } from "./checkIfPathExists";
import { resolve } from "path";
import chalk from "chalk";
import { NextDeployConfig } from "../types";

export async function configFileUtility() {
    let filePath = resolve("./next-deploy.config.js"),
        fileExists = checkIfPathExists(filePath);

    if (!fileExists) {
        writeFileSync(
            filePath,
            `/** @type {import("@kpverse/next-deploy").NextDeployConfig} */
const nextDeployConfig = {
    BuildFolderPath: {
        type: "RELATIVE",
        path: "./out",
    },
    // TargetRepoPath: {
    //     type: "RELATIVE",
    //     path: "<TARGET_REPO_PATH>",
    // },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};

module.exports = nextDeployConfig;`
        );

        console.log(
            `A configuration file for "next-deploy" is created at ${chalk.greenBright(
                filePath
            )}.

Please re-run "next-deploy" after you provide neccesary information in the configuration file.`
        );

        process.exit();
    }
    let {
        TargetRepoPath,
        BuildFolderPath,
        askBeforeCommit,
        askToChangeEnvVariables,
    }: NextDeployConfig = (await import(filePath)).default;

    if (TargetRepoPath === undefined) {
        console.log(
            `\n${chalk.red("ERROR:")} No "${chalk.blueBright(
                "TargetRepoPath"
            )}" property provided in "${chalk.greenBright(filePath)}".`
        );
        process.exit();
    }

    let configuration: {
        TargetRepoPath: string;
        BuildFolderPath: string;
        askBeforeCommit: boolean;
        askToChangeEnvVariables: boolean;
    } = {
        TargetRepoPath:
            TargetRepoPath.type === "RELATIVE"
                ? resolve(TargetRepoPath.path)
                : TargetRepoPath.path,
        BuildFolderPath: (function () {
            let newPath = "";
            if (BuildFolderPath === undefined) {
                newPath = resolve("./out");
                console.log(
                    `\n${chalk.yellowBright(
                        "ATTENTION REQUIRED:"
                    )} Considering ${chalk.blueBright(
                        newPath
                    )} as default build folder path. You can change it in ${chalk.greenBright(
                        filePath
                    )} file.`
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

    // if(checkIfPathExists())

    return configuration;
}
