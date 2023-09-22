import { statSync } from "fs";
import { join } from "path";
import { checkIfPathExists } from "./checkIfPathExists";

const PATH_DO_NOT_EXIST = "PATH_DO_NOT_EXIST";

export function isFileOrDir(
    path: string
): "PATH_DO_NOT_EXIST" | "DIR" | "FILE" {
    if (checkIfPathExists(path) === "NO") return PATH_DO_NOT_EXIST;

    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {
        console.log(`\n${error}`);
    }
    return PATH_DO_NOT_EXIST;
}

export function isFile(path: string): boolean | "PATH_DO_NOT_EXIST" {
    if (checkIfPathExists(path) === "NO") return PATH_DO_NOT_EXIST;
    return isFileOrDir(path) === "FILE";
}

export function isDir(path: string): boolean | "PATH_DO_NOT_EXIST" {
    if (checkIfPathExists(path) === "NO") return PATH_DO_NOT_EXIST;
    return isFileOrDir(path) === "DIR";
}

export function isRepo(dirPath: string): "PATH_DO_NOT_EXIST" | "NO" | "YES" {
    let PATH_IS_DIR_STATUS = isDir(dirPath);

    if (PATH_IS_DIR_STATUS === "PATH_DO_NOT_EXIST") return PATH_DO_NOT_EXIST;

    if (!PATH_IS_DIR_STATUS) return "NO";

    let GIT_PATH_EXIST_STATUS = isDir(join(dirPath, ".git"));

    if (GIT_PATH_EXIST_STATUS === "PATH_DO_NOT_EXIST" || !GIT_PATH_EXIST_STATUS)
        return "NO";

    return "YES";
}
