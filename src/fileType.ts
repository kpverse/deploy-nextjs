import { PathLike, statSync } from "fs";

export function isFileOrDir(path: PathLike) {
    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {
        return null;
    }
}

export function isFile(path: PathLike) {
    return isFileOrDir(path) === "FILE";
}

export function isDir(path: PathLike) {
    return isFileOrDir(path) === "DIR";
}
