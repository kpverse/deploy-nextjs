import { config } from "dotenv";
import { configure, deployNextApp } from "../index";

config();

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
    // askBeforeCommit: false,
});

deployNextApp();
