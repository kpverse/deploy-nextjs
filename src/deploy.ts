import { execSync } from "child_process";
import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { askQuestion, readline } from "./askQuestion";
import { clearFolderContent } from "./clearFolderContent";
import { getConfiguration, CURRENT_PATH } from "./configuration";
import { copyFolderContent } from "./copyFolderContent";
import { isFile } from "./fileType";
import { VERSION } from "./metadata";

export async function deployNextApp() {
    let files = readdirSync(CURRENT_PATH),
        dotenvExists = false;

    for (let index = 0; index < files.length; index++) {
        if (files[index].startsWith(".env")) {
            dotenvExists = true;
            break;
        }
    }

    if (dotenvExists) {
        let decision = (
            await askQuestion(
                "Do you want to change any environment variable in file? [y|n]: "
            )
        ).toLowerCase();

        while (!["y", "n"].includes(decision)) {
            console.log('\nEnter "y" or "n" only.');

            decision = (
                await askQuestion(
                    "Do you want to change any environment variable in file? [y|n]: "
                )
            ).toLowerCase();
        }

        if (decision === "y") {
            console.log(
                `\nPlease re-run previous command, after you change environment variables.`
            );
            process.exit();
        }
    }

    console.log("\nBuilding Next.js app...");

    let build_output = execSync("npm run build");

    console.log("\n" + build_output.toString());

    let configuration = getConfiguration();

    if (!configuration) {
        console.log(`ERROR: Configuration not provided`);
        process.exit();
    }

    let { BuildFolderPath, TargetRepoPath } = configuration;

    await clearFolderContent(TargetRepoPath, [".git"]);
    await copyFolderContent(BuildFolderPath, TargetRepoPath);

    // Create ".nojekyll" file if it doesn't exist.
    if (!isFile(join(TargetRepoPath, ".nojekyll"))) {
        writeFileSync(join(TargetRepoPath, ".nojekyll"), "");

        let MORE_INFO = `It is necessary for hosting Next.js app on GitHub Pages. Read more: "https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/".`;

        console.log(
            '".nojekyll" file created at' + ` "${TargetRepoPath}". ${MORE_INFO}`
        );
    }

    console.log(`\nNext.js build folder is copied to "${TargetRepoPath}".`);

    // Ask if user want to perform git push.
    let decision = (
        await askQuestion("Push to the remote repository? [y|n]: ")
    ).toLowerCase();

    while (!["y", "n"].includes(decision)) {
        console.log('\nEnter "y" or "n" only.');
        decision = (
            await askQuestion("\nPush to the remote repository? [y|n]: ")
        ).toLowerCase();
    }

    if (decision === "y") {
        let command = [
            `cd ${TargetRepoPath}`,
            "git add .",
            `git commit -m "Auto-commit by deploy-next-app v${VERSION}"`,
            "git push",
            `cd ${CURRENT_PATH}`,
        ].join(" && ");

        execSync(command);

        console.log("\n\n✨ Done");
    } else if (decision === "n")
        console.log(
            `\nRepository "${TargetRepoPath}" is ready for manual commit.`
        );

    console.log(
        `\nThank you for using "deploy-next-app". Report issues at "https://github.com/kpverse/deploy-next-app/issues/new".\n`
    );
    readline.close();
    process.exit();
}
