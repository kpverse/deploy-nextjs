import { PathLike, statSync } from "fs";
import { checkIfPathExists } from "./checkIfPathExists";

export function isFileOrDir(path: PathLike) {
    if (!checkIfPathExists(path)) return;

    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {}
}

export function isFile(path: PathLike) {
    if (!checkIfPathExists(path)) return;
    return isFileOrDir(path) === "FILE";
}

export function isDir(path: PathLike) {
    if (!checkIfPathExists(path)) return;
    return isFileOrDir(path) === "DIR";
}
