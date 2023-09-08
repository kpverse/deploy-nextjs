import chalk from "chalk";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import { askQuestion, readlineInterface } from "./askQuestion";
import { buildProcess } from "./buildProcess";
import { checkIfPathExists } from "./file-utilities/checkIfPathExists";
import { clearFolderContent } from "./file-utilities/clearFolderContent";
import { configFileUtility } from "./file-utilities/configFileUtility";
import { copyFolderContent } from "./file-utilities/copyFolderContent";
import { isFile } from "./file-utilities/fileType";
import { VERSION } from "./metadata";
import { NextDeployConfig } from "./types";

(async function () {
    console.log(
        `\ndeploy-nextjs v${VERSION} from ${chalk.blue(
            "KPVERSE (https://kpverse.in)"
        )}.\nCopyright (c) 2023 - Kartavya Patel.`
    );

    let {
        BuildFolderPath,
        DeploymentRepoPath,
        askToChangeEnvVariables,
        configFilePath,
        askBeforeCommit,
    } = await configFileUtility();

    let BuildFolderPathStatus = checkIfPathExists(BuildFolderPath);

    if (!BuildFolderPathStatus) {
        let answer = (
            await askQuestion(
                `\nBuild folder path (${chalk.blue(
                    BuildFolderPath
                )}) does not exist.\nWould you like to start build process? [ y | n ]: `
            )
        ).toLowerCase();
        while (!["y", "n"].includes(answer))
            answer = (
                await askQuestion("\nPlease enter 'y' or 'n': ")
            ).toLowerCase();
        if (answer === "n") {
            readlineInterface.close();
            process.exit();
        } else if (answer === "y")
            /** Start build process */
            await buildProcess(askToChangeEnvVariables);
    } else await buildProcess(askToChangeEnvVariables);

    BuildFolderPathStatus = checkIfPathExists(BuildFolderPath);

    if (!BuildFolderPathStatus) {
        console.log(
            `\n${chalk.red("ERROR:")} Build folder path (${chalk.blue(
                BuildFolderPath
            )}) still does not exist. Make sure you have provided proper configuration in ${chalk.greenBright(
                configFilePath
            )}.`
        );
        readlineInterface.close();
        process.exit();
    }

    await clearFolderContent(DeploymentRepoPath, [".git"]);
    await copyFolderContent(BuildFolderPath, DeploymentRepoPath);

    /** Create ".nojekyll" file if it doesn't exist. */
    if (!isFile(join(DeploymentRepoPath, ".nojekyll"))) {
        writeFileSync(join(DeploymentRepoPath, ".nojekyll"), "");

        let MORE_INFO = `It is necessary for hosting Next.js app on GitHub Pages. Read more: "${chalk.blue(
            "https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/"
        )}".`;

        console.log(
            `\n"${chalk.blue(
                ".nojekyll"
            )}" file created at "${chalk.greenBright(
                DeploymentRepoPath
            )}". ${MORE_INFO}`
        );
    }

    console.log(
        `\nAll content of build folder is copied to "${chalk.greenBright(
            DeploymentRepoPath
        )}".`
    );

    let push_to_remote_decision;

    if (askBeforeCommit) {
        /** Ask if user want to perform git push. */
        push_to_remote_decision = (
            await askQuestion(
                "\nPush changes to the remote repository? [ y | n ]: "
            )
        ).toLowerCase();

        while (!["y", "n"].includes(push_to_remote_decision))
            push_to_remote_decision = (
                await askQuestion("\nPlease enter 'y' or 'n': ")
            ).toLowerCase();

        if (push_to_remote_decision === "n")
            console.log(
                `\nDeployment repository "${chalk.greenBright(
                    DeploymentRepoPath
                )}" is ready for manual commit.`
            );
    }

    if (
        !askBeforeCommit ||
        (askBeforeCommit && push_to_remote_decision === "y")
    ) {
        let command = [
            `cd ${DeploymentRepoPath}`,
            "git add .",
            `git commit -m "Auto-commit by NextJS Deployment Utility (v${VERSION}) from KPVERSE"`,
            "git push",
        ].join(" && ");

        try {
            let output = execSync(command);
            console.log(`\n${output}\n\n✨ Done`);
        } catch (error) {
            console.log(`\n${error}`);
        }
    }

    console.log(
        `\nThank you for using "${chalk.greenBright(
            "@kpverse/deploy-nextjs"
        )}". Report issues at "${chalk.blue(
            "https://github.com/kpverse/deploy-nextjs/issues/new"
        )}".\n`
    );

    readlineInterface.close();
})();

export { NextDeployConfig };
