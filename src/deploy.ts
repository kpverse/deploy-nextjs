import chalk from "chalk";
import { getConfiguration } from "./configuration";
import { clearFolderContent } from "./clearFolderContent";
import { copyFolderContent } from "./copyFolderContent";
import { askQuestion } from "./askQuestion";
import { isFile } from "./fileType";
import { join } from "path";
import { writeFileSync } from "fs";

export async function deployNextApp() {
    let configuration = getConfiguration();

    if (!configuration) {
        console.log(chalk.red("ERROR: ") + "Configuration not provided");
        process.exit();
    }

    let { BuildFolderPath, TargetRepoPath } = configuration;

    await clearFolderContent(TargetRepoPath, [".git"]);
    await copyFolderContent(BuildFolderPath, TargetRepoPath);

    // Create ".nojekyll" file if it doesn't exist.
    if (!isFile(join(TargetRepoPath, ".nojekyll"))) {
        writeFileSync(join(TargetRepoPath, ".nojekyll"), "");

        let MORE_INFO = `It is necessary for hosting Next.js app on GitHub Pages. Read more: "${chalk.blueBright(
            "https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/"
        )}".`;

        console.log(
            chalk.green('".nojekyll" file created at') +
                ` "${TargetRepoPath}". ${MORE_INFO}`
        );
    }

    // Ask if user want to perform git push.
    await askQuestion("Push to the remote repository?", "NO");

    console.log("done");
    process.exit();
}
