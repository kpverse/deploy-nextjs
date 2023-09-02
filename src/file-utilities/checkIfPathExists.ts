import { PathLike, existsSync } from "fs";

export function checkIfPathExists(path: PathLike) {
    if (existsSync(path)) return true;
    return false;
}
