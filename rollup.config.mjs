import { config } from "dotenv";
import dts from "rollup-plugin-dts";

config();

export default [
    process.env.reason === "bundling" && {
        input: "./build/index.js",
        output: {
            file: "./bin/index.js",
            format: "esm",
        },
        external: ["chalk", "fs", "path", "readline", "child_process"],
    },
    process.env.reason === "bundling" && {
        input: "./src/types.ts",
        output: {
            file: "./types/index.d.ts",
            format: "es",
        },
        plugins: [dts()],
    },
    process.env.reason === "license-comment" && {
        input: "./bin/index.js",
        output: {
            file: "./bin/index.js",
            format: "cjs",

            banner: `#!/usr/bin/env node

/**
 * @kpverse/deploy-nextjs@0.1.0 - Next JS Deployment Utility from KPVERSE (https://kpverse.in).
 *
 * Copyright © Kartavya Patel, KPVERSE - All Rights Reserved.
 */`,
        },
    },
].filter(Boolean);
