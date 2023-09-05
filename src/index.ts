// export { configure } from "./configuration";
// export { deployNextApp } from "./deploy";
import { NextDeployConfig } from "./types";
export { NextDeployConfig };

import chalk from "chalk";
import { VERSION } from "./metadata";
import { resolve } from "path";

async function main() {
    console.log(
        `\nnext-deploy ${chalk.blueBright(
            `v${VERSION}`
        )} from ${chalk.blueBright(
            "KPVERSE (https://kpverse.in)"
        )}.\nCopyright (c) 2023 - Kartavya Patel.\n`
    );

    let nextDeployConfig: NextDeployConfig = (
        await import(resolve("./next-deploy.config.js"))
    ).default;

    console.log(nextDeployConfig.BuildFolder.path);
}

main();
