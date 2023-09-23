import { readdirSync, rmSync } from "fs";
import { join } from "path";

export async function clearFolderContent(path: string, leave: string[] = []) {
    let files = readdirSync(path);

    files.forEach((file) => {
        if (!leave.includes(file))
            rmSync(join(path, file), {
                force: true,
                recursive: true,
            });
    });
}
