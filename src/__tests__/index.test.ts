import { config } from "dotenv";
import { configure } from "../configuration";
import { deployNextApp } from "../deploy";
import { VERSION } from "../metadata";

console.log(`
deploy-next-app v${VERSION} from KPVERSE (https://kpverse.in)
Copyright (c) 2023 - Kartavya Patel.
`);

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
});

deployNextApp();
