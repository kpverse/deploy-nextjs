import { statSync } from "fs";
import { checkIfPathExists } from "./checkIfPathExists";
import { join, resolve } from "path";

export function isFileOrDir(path: string) {
    if (!checkIfPathExists(path)) return;

    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {
        console.log(`\n${error}`);
    }
}

export function isFile(path: string) {
    if (!checkIfPathExists(path)) return;
    return isFileOrDir(path) === "FILE";
}

export function isDir(path: string) {
    if (!checkIfPathExists(path)) return;
    return isFileOrDir(path) === "DIR";
}

export function isRepo(path: string) {
    if (!checkIfPathExists(path)) return;
    return !checkIfPathExists(join(path, ".git"));
}
