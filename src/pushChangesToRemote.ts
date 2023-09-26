import chalk from "chalk";
import { askQuestion } from "./askQuestion";
import { execSync } from "child_process";
import { VERSION } from "./metadata";

export default async function pushChangesToRemote(
    askBeforeCommit: boolean,
    deploymentRepoPath: string
) {
    let push_to_remote_decision;

    if (askBeforeCommit) {
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
                )}" is ready for manual commit and push.`
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
}
