const fs = require("fs");
const { spawn } = require("child_process");

let file = "./test.js";
let command;

// previously modified time in ms;
let prevm = fs.statSync(file).mtimeMs;
console.log("\x1b[33m%s\x1b[0m", "Watching for file to change");
runCommand();
setInterval(() => {
    let now = fs.statSync(file).mtimeMs;

    // if both are not same that means the file has been changed
    if (prevm !== now) {
        if (command) {
            command.kill();
        }
        runCommand();
        prevm = now;
    }
}, 1000);

function runCommand() {
    console.log("\x1b[32m%s\x1b[0m", "Changes detected...\n");
    command = spawn("node", [file]);
    command.stdout.on("data", (output) => {
        console.log(output.toString());
    });
}
