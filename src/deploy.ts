import { resolve } from "path";
import { DeployNextAppConfig } from "./types";
import { isDir } from "./fileType";
import chalk from "chalk";

const CURRENT_PATH = resolve("./");

export function deployNextApp(config: DeployNextAppConfig) {
    let { BuildFolder } = config;

    if (BuildFolder.type === "RELATIVE")
        BuildFolder.path = resolve(CURRENT_PATH, BuildFolder.path);

    const BuildFolderPath = BuildFolder.path;
    // console.log(BuildFolder.path);

    if (!isDir(BuildFolderPath)) {
        console.log(`"${BuildFolderPath}"` + chalk.red(" is not a folder."));
        process.exit();
    }
}
