const fs = require("fs");
// const txt = "./readFile.js";
const txtin = fs.readFileSync("./readFile.txt", "utf-8");
console.log(txtin)
// above code is for read the data from file ;

// this code is for write data in a particular file 
let content = `Data read from readFile.txt: ${txtin}. =\nDate created ${new Date()}`
const txtOutput = fs.writeFileSync("./outputFile.txt", content)
