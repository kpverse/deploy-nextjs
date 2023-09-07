import { statSync } from "fs";
import { join } from "path";
import { checkIfPathExists } from "./checkIfPathExists";

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

export function isRepo(dirPath: string) {
    if (!checkIfPathExists(dirPath)) return;
    return (
        checkIfPathExists(join(dirPath, ".git")) && isDir(join(dirPath, ".git"))
    );
}
