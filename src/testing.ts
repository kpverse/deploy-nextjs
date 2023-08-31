import chalk from "chalk";
import { config as dotenvConfig } from "dotenv";
import { deployNextApp } from "./deploy";
import { VERSION } from "./metadata";
import { configure } from "./configuration";

console.log(`
deploy-next-app ${chalk.blueBright(`v${VERSION}`)} from ${chalk.blueBright(
    "KPVERSE (https://kpverse.in)"
)}
Copyright (c) 2023 - Kartavya Patel.
`);

dotenvConfig();

configure({
    BuildFolder: {
        type: process.env.BUILD_FOLDER_PATH ? "ABSOLUTE" : "RELATIVE",
        path: process.env.BUILD_FOLDER_PATH
            ? process.env.BUILD_FOLDER_PATH
            : "./",
    },
    TargetRepo: {
        type: process.env.TARGET_REPO_PATH ? "ABSOLUTE" : "RELATIVE",
        path: process.env.TARGET_REPO_PATH
            ? process.env.TARGET_REPO_PATH
            : "./",
    },
});

deployNextApp();
