import { join, resolve } from "path";
import { isDir } from "./file-utilities/fileType";
import { DeployNextAppConfig } from "./types";

export let configuration: {
    BuildFolderPath: string;
    TargetRepoPath: string;
};

export function getConfiguration() {
    return configuration !== undefined ? configuration : undefined;
}

export const CURRENT_PATH = resolve("./");

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
            `ERROR: Build folder path, "${configuration.BuildFolderPath}", is not a folder.`
        );
        process.exit();
    }

    if (TargetRepo.type === "RELATIVE")
        TargetRepo.path = resolve(CURRENT_PATH, TargetRepo.path);

    configuration.TargetRepoPath = TargetRepo.path;

    // If target folder path is not a folder, exit the process.
    if (!isDir(configuration.TargetRepoPath)) {
        console.log(
            `ERROR: Target repository path, "${configuration.TargetRepoPath}" is not a folder .`
        );
        process.exit();
    }

    // If target folder is not a repository, exit the process.
    if (!isDir(join(configuration.TargetRepoPath, ".git"))) {
        console.log(
            `ERROR: Target repository path, "${configuration.TargetRepoPath}" is not a repository.`
        );
        process.exit();
    }

    // If build folder path and target repository path are same, exit the process.
    if (configuration.BuildFolderPath === configuration.TargetRepoPath) {
        console.log(
            `ERROR: Build folder path and target repository path can not be same.`
        );
        process.exit();
    }
}
