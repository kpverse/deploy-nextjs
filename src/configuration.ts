import { join, resolve } from "path";
import { DeployNextAppConfig } from "./types";
import { isDir } from "./fileType";
import chalk from "chalk";

export let configuration: {
    BuildFolderPath: string;
    TargetRepoPath: string;
};

export function getConfiguration() {
    return configuration !== undefined ? configuration : undefined;
}

const CURRENT_PATH = resolve("./");

export function configure(config: DeployNextAppConfig) {
    let { BuildFolder, TargetRepo } = config;

    if (BuildFolder.type === "RELATIVE")
        BuildFolder.path = resolve(CURRENT_PATH, BuildFolder.path);

    if (!configuration)
        configuration = { BuildFolderPath: "", TargetRepoPath: "" };

    configuration.BuildFolderPath = BuildFolder.path;

    // If build folder path is not a folder, exit the process.
    if (!isDir(configuration.BuildFolderPath)) {
        console.log(
            chalk.red("ERROR: ") +
                `Build folder path, "${configuration.BuildFolderPath}" ` +
                chalk.yellow("is not a folder") +
                "."
        );
        process.exit();
    }

    if (TargetRepo.type === "RELATIVE")
        TargetRepo.path = resolve(CURRENT_PATH, TargetRepo.path);

    configuration.TargetRepoPath = TargetRepo.path;

    // If target folder path is not a folder, exit the process.
    if (!isDir(configuration.TargetRepoPath)) {
        console.log(
            chalk.red("ERROR: ") +
                `Target repository path, "${configuration.TargetRepoPath}" ` +
                chalk.yellow("is not a folder") +
                "."
        );
        process.exit();
    }

    // If target folder is not a repository, exit the process.
    if (!isDir(join(configuration.TargetRepoPath, ".git"))) {
        console.log(
            chalk.red("ERROR: ") +
                `Target repository path, "${configuration.TargetRepoPath}" ` +
                chalk.yellow("is not a repository") +
                "."
        );
        process.exit();
    }

    // If build folder path and target repository path are same, exit the process.
    if (configuration.BuildFolderPath === configuration.TargetRepoPath) {
        console.log(
            chalk.red("ERROR: ") +
                "Build folder path and target repository path " +
                chalk.yellow("can not be same") +
                "."
        );
        process.exit();
    }
}
