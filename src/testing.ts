import { VERSION } from "./metadata";
import chalk from "chalk";
import { deployNextApp } from "./deploy";

console.log(`
deploy-next-app ${chalk.greenBright(`v${VERSION}`)} from ${chalk.blueBright(
    "KPVERSE (https://kpverse.in)"
)}
Copyright (c) 2023 - Kartavya Patel.
`);

// const path = resolve("./", "node_modules");

// if (isFileOrDir(path)) console.log(path);

deployNextApp({
    BuildFolder: {
        type: "RELATIVE",
        path: "./",
    },
    TargetRepo: {
        type: "RELATIVE",
        path: "./",
    },
});
