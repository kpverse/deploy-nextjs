import { PathLike, existsSync } from "fs";

export function checkIfPathExists(path: PathLike): "YES" | "NO" {
    if (existsSync(path)) return "YES";
    return "NO";
}
