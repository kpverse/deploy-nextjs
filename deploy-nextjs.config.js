const { config } = require("dotenv");

config();

/** @type {import("@kpverse/deploy-nextjs").NextDeployConfig} */
const nextDeployConfig = {
    BuildFolderPath: {
        type: "RELATIVE",
        path: "./out",
    },
    DeploymentRepoPath: {
        type: "ABSOLUTE",
        path: process.env.DEPLOYMENT_REPO_PATH,
    },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};

module.exports = nextDeployConfig;
