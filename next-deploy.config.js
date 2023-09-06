/** @type {import("@kpverse/next-deploy").NextDeployConfig} */
const nextDeployConfig = {
    TargetRepoPath: {
        type: "RELATIVE",
        path: "<TARGET_REPO_PATH>",
    },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};

module.exports = nextDeployConfig;
