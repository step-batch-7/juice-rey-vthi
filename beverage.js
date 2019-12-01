const performCmd = require("./src/performOperation").performCmd;
const readFile = require("./src/fileReader").readFile;
const dateGenerator = require("./src/fileReader").date;
const { getDataStorePath, timeStamp } = require("./src/config");
const writeIntoFile = require("./src/fileReader").writeIntoFile;

const main = function(args) {
  const path = getDataStorePath(process.env);
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  const transactionRecord = performCmd(
    args.slice(2),
    path,
    readFile,
    timeStampWithEnv,
    writeIntoFile
  );
  console.log(transactionRecord);
};
main(process.argv);
