import { config } from "dotenv";
import dts from "rollup-plugin-dts";

config();

export default [
    {
        input: "./build/index.js",
        output: {
            file: "./bin/index.js",
            format: "cjs",
            banner: `#!/usr/bin/env node

/**
 * deploy-nextjs v0.1.0 from KPVERSE (https://kpverse.in)
 *
 * Copyright (c) 2023 - Kartavya Patel.
 */`,
        },
        external: ["chalk", "fs", "path", "readline", "child_process"],
    },
    {
        input: "./src/index.ts",
        output: {
            file: "./types/index.d.ts",
            format: "es",
        },
        plugins: [dts()],
    },
];
