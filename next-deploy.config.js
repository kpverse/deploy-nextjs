const { config } = require("dotenv");

config();

/** @type {import('./src').NextDeployConfig} */
const nextDeployConfig = {
    BuildFolder: {
        path: process.env.TARGET_REPO_PATH,
    },
};

module.exports = nextDeployConfig;
