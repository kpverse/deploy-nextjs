import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import { askQuestion, readlineInterface } from "./askQuestion";
import { clearFolderContent } from "./file-utilities/clearFolderContent";
import { configFileUtility } from "./config-utilities/main";
import { copyFolderContent } from "./file-utilities/copyFolderContent";
import { isFile } from "./file-utilities/fileType";
import { VERSION } from "./metadata";

(async function () {
    console.log(
        `\n${chalk.greenBright(
            `@kpverse/deploy-nextjs@${VERSION}`
        )} - Next JS Deployment Automation Tool from KPVERSE (https://kpverse.in).\nCopyright © Kartavya Patel, KPVERSE - All Rights Reserved.`
    );

    let {
        buildFolderPath,
        // askToChangeEnvVariables,
        // configFilePath,
        deploymentRepoPath,
        askBeforeCommit,
    } = await configFileUtility();

    await clearFolderContent(deploymentRepoPath, [".git"]);
    await copyFolderContent(buildFolderPath, deploymentRepoPath);

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

    console.log(
        `\nAll build folder content has been copied to "${chalk.greenBright(
            deploymentRepoPath
        )}".`
    );

    let push_to_remote_decision;

    if (askBeforeCommit) {
        //  Ask if user want to perform git push.
        push_to_remote_decision = (
            await askQuestion(
                "\nPush changes to the remote repository? [y/n]: "
            )
        ).toLowerCase();

        while (!["y", "n"].includes(push_to_remote_decision))
            push_to_remote_decision = (
                await askQuestion("\nPlease enter 'y' or 'n': ")
            ).toLowerCase();

        if (push_to_remote_decision === "n")
            console.log(
                `\nDeployment repository "${chalk.greenBright(
                    deploymentRepoPath
                )}" is ready for manual commit.`
            );
    }

    if (
        !askBeforeCommit ||
        (askBeforeCommit && push_to_remote_decision === "y")
    ) {
        let command = [
            `cd ${deploymentRepoPath}`,
            "git add .",
            `git commit -m "Automated commit by @kpverse's Next JS Deployment Utility (v${VERSION})."`,
            "git push",
        ].join(" && ");

        try {
            let output = execSync(command);
            console.log(`\n${output}\n\n✨ Done`);
        } catch (error) {
            console.log(
                `\n${chalk.red(
                    "ERROR: "
                )} Failed to push commits from ${chalk.greenBright(
                    deploymentRepoPath
                )} to the remote repository.\n\n${chalk.yellow(
                    "DETAILS:"
                )}\n${error}`
            );
        }
    }

    console.log(
        `\nThank you for choosing "${chalk.greenBright(
            "@kpverse/deploy-nextjs"
        )}".\nIf you encounter any issues, please don't hesitate to report them at "${chalk.blue(
            "https://github.com/kpverse/deploy-nextjs/issues/new"
        )}". Your feedback is highly appreciated!`
    );

    readlineInterface.close();
})();
