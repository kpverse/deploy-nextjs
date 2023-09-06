import { config } from "dotenv";
import dts from "rollup-plugin-dts";

config();

export default [
    {
        input: `./build/converted/${
            process.env.DEVELOPMENT_MODE === "true"
                ? "__tests__/index.test.js"
                : "index.js"
        }`,
        output: {
            file: "./build/index.js",
            format: "cjs",
            banner: `/**
 * next-deploy v0.1.0 from KPVERSE (https://kpverse.in)
 *
 * Copyright (c) 2023 - Kartavya Patel.
 */`,
        },
        external: ["chalk", "fs", "path"],
    },
    {
        input: "./src/index.ts",
        output: {
            file: "./build/index.d.ts",
            format: "es",
        },
        plugins: [dts()],
    },
];
