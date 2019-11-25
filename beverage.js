const performOperation = require("./src/performOperation").performOperation;
const fileExist = require("./src/performOperation").fileExist;

const main = function(args) {
  const path = "./src/juiceTransacDetaials.json";
  const date = new Date();
  const existingTransaction = fileExist(path);
  const transactionDetails = performOperation(
    existingTransaction,
    args.slice(2),
    path,
    date
  );
  console.log(transactionDetails);
};
main(process.argv);
