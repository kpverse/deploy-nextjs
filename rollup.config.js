import { config } from "dotenv";

config();

export default {
    input: `./build/converted/${
        process.env.DEVELOPMENT_MODE === "true" ? "testing.js" : "index.js"
    }`,
    output: {
        file: "./build/out/index.js",
        format: "es",
        banner: `/**
 * deploy-next-app v0.1.0 from KPVERSE (https://kpverse.in)
 *
 * Copyright (c) 2023 - Kartavya Patel.
 */\n"use strict";`,
    },
    external: ["path", "fs", "chalk"],
};
