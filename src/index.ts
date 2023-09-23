import chalk from "chalk";
import { writeFileSync } from "fs";
import { join } from "path";
import { readlineInterface } from "./askQuestion";
import { clearFolderContent } from "./file-utilities/clearFolderContent";
import { configFileUtility } from "./config-utilities/deployment/main";
import { copyFolderContent } from "./file-utilities/copyFolderContent";
import { isFile } from "./file-utilities/fileType";
import { VERSION } from "./metadata";
import getBasePath from "./config-utilities/nextjs/getBasePath";
import { checkIfPathExists } from "./file-utilities/checkIfPathExists";
import pushChangesToRemote from "./pushChangesToRemote";

(async function () {
    console.log(
        `\n${chalk.greenBright(
            `@kpverse/deploy-nextjs@${VERSION}`
        )} - Next JS Deployment Automation Tool from KPVERSE (https://kpverse.in).\nCopyright © Kartavya Patel, KPVERSE - All Rights Reserved.`
    );

    let { buildFolderPath, deploymentRepoPath, askBeforeCommit } =
        await configFileUtility();

    let basePath = await getBasePath(),
        destinationPath: string = "";

    if (typeof basePath === "string") {
        destinationPath = join(deploymentRepoPath, basePath);
        let basePathStatus = checkIfPathExists(destinationPath);

        if (basePathStatus === "YES") await clearFolderContent(destinationPath);
    } else if (basePath === undefined) {
        destinationPath = deploymentRepoPath;
        await clearFolderContent(destinationPath, [".git"]);
    }

    await copyFolderContent(buildFolderPath, destinationPath);

    console.log(
        `\nAll build folder content has been copied to "${chalk.greenBright(
            destinationPath
        )}".`
    );

    //  Create ".nojekyll" file if it doesn't exist.
    let NO_JEKYLL_FILE_STATUS = isFile(join(deploymentRepoPath, ".nojekyll"));
    if (
        NO_JEKYLL_FILE_STATUS === "PATH_DO_NOT_EXIST" ||
        !NO_JEKYLL_FILE_STATUS
    ) {
        writeFileSync(join(deploymentRepoPath, ".nojekyll"), "");

        console.log(
            `Created a "${chalk.blue(
                ".nojekyll"
            )}" file at "${chalk.greenBright(
                deploymentRepoPath
            )}" for hosting your static website on GitHub Pages. Learn more: "${chalk.blue(
                "https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/"
            )}".`
        );
    }

    await pushChangesToRemote(askBeforeCommit, deploymentRepoPath);

    console.log(
        `\nThank you for choosing "${chalk.greenBright(
            "@kpverse/deploy-nextjs"
        )}".\n\nIf you encounter any issues, please don't hesitate to report them at "${chalk.blue(
            "https://github.com/kpverse/deploy-nextjs/issues/new"
        )}". Your feedback is highly appreciated!\n`
    );

    readlineInterface.close();
})();
