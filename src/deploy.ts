import { join, resolve } from "path";
import { DeployNextAppConfig } from "./types";
import { isDir } from "./fileType";
import chalk from "chalk";

const CURRENT_PATH = resolve("./");

export function deployNextApp(config: DeployNextAppConfig) {
    let { BuildFolder, TargetRepo } = config;

    if (BuildFolder.type === "RELATIVE")
        BuildFolder.path = resolve(CURRENT_PATH, BuildFolder.path);

    const BuildFolderPath = BuildFolder.path;

    if (!isDir(BuildFolderPath)) {
        console.log(
            `"${BuildFolderPath}"` + chalk.red(" is not a folder") + "."
        );
        process.exit();
    }

    if (TargetRepo.type === "RELATIVE")
        TargetRepo.path = resolve(CURRENT_PATH, TargetRepo.path);

    const TargetRepoPath = TargetRepo.path;

    if (!isDir(TargetRepoPath) || !isDir(join(TargetRepoPath, ".git"))) {
        console.log(
            `"${TargetRepoPath}"` + chalk.red(" is not a repository") + "."
        );
        process.exit();
    }
}
