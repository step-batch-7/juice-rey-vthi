const performCmd = require("./src/performOperation").performCmd;
const readFile = require("./src/fileReader").readFile;
const dateGenerator = require("./src/fileReader").date;
const writeIntoFile = require("./src/fileReader").writeIntoFile;

const main = function(args) {
  const path = "./juiceTransacDetails.json";
  const existingTransaction = readFile(path);
  const transactionRecord = performCmd(
    existingTransaction,
    args.slice(2),
    path,
    dateGenerator,
    writeIntoFile
  );
  console.log(transactionRecord);
};
main(process.argv);
