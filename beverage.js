const performCmd = require("./src/performOperation").performCmd;
const readFile = require("./src/fileReader").readFile;
const dateGenerator = require("./src/fileReader").date;
const writeIntoFile = require("./src/fileReader").writeIntoFile;

const main = function(args) {
  const path = "./juiceTransacDetails.json";
  const transactionRecord = performCmd(
    args.slice(2),
    path,
    readFile,
    dateGenerator,
    writeIntoFile
  );
  console.log(transactionRecord);
};
main(process.argv);
