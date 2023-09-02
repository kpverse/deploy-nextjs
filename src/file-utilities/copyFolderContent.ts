import { cpSync } from "fs";

export async function copyFolderContent(from: string, to: string) {
    cpSync(from, to, { recursive: true });
}
