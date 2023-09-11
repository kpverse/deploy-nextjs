const { config } = require("dotenv");

config();

/** @type {import("@kpverse/deploy-nextjs").NextDeployConfig} */
module.exports = {
    buildFolderPath: {
        type: "RELATIVE",
        path: "./out",
    },
    deploymentRepoPath: {
        type: "ABSOLUTE",
        path: process.env.DEPLOYMENT_REPO_PATH,
    },
    // askBeforeCommit: true,
    // askToChangeEnvVariables: true,
};
