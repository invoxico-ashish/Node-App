const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`please enter your name:`, function (name) {
    console.log(`you are ${name}`)
    rl.close();
})
rl.on("close", function () {
    console.log("interface closed")
    process.exit(0);
})