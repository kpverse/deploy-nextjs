import chalk from "chalk";
import { PathLike, existsSync } from "fs";

export function checkIfPathExists(path: PathLike) {
    if (existsSync(path)) return;
    console.log(chalk.yellow("Can not find ") + `"${path}".`);
    process.exit();
}
