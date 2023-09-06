import { NextDeployConfig } from "./types";
import chalk from "chalk";
import { VERSION } from "./metadata";
import { configFileUtility } from "./file-utilities/configFileUtility";

async function main() {
    console.log(
        `
next-deploy ${chalk.blueBright(`v${VERSION}`)} from ${chalk.blueBright(
            "KPVERSE (https://kpverse.in)"
        )}.
Copyright (c) 2023 - Kartavya Patel.`
    );

    let configuration = await configFileUtility();

    console.log(configuration);
}

main();

export { NextDeployConfig };
