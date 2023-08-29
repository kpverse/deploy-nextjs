import { PathLike, statSync } from "fs";
import { checkIfPathExists } from "./checkIfPathExists";

export function isFileOrDir(path: PathLike) {
    checkIfPathExists(path);

    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {}
}

export function isFile(path: PathLike) {
    checkIfPathExists(path);
    return isFileOrDir(path) === "FILE";
}

export function isDir(path: PathLike) {
    checkIfPathExists(path);
    return isFileOrDir(path) === "DIR";
}
