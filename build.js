const { exec } = require("child_process");

let commands = [
    // "rm -rf ./build/",
    // "npx tsc -p ./tsconfig.json", // To use TSC for TS to JS transpilation.
    "npx swc ./src -d ./build --config-file config1.swcrc", // To use SWC for TS to JS transpilation.
    "npx rollup -c --environment reason:bundling",
    "npx swc ./bin/index.js -o ./bin/index.js --config-file config2.swcrc",
    "npx rollup -c --environment reason:license-comment",
];

function runCommand(index = 0) {
    exec(commands[index], (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            process.exit();
        }

        console.log(stdout === "" ? stderr : stdout);

        if (index < commands.length - 1) runCommand(index + 1);
    });
}

runCommand();
