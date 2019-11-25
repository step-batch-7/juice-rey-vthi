const fs = require("fs");
const expectedSaveOption = ["--beverage", "--empId", "--qty"];
const expectedQueryOption = ["--empId"];
const expectedBeverage = ["Orange", "Apple", "Pomogranate", "Grapes", "Banana"];

const validateSavePair = function(args) {
  let isValidOption = expectedSaveOption.includes(args[0]);
  if (args[0] == "--beverage") {
    return expectedBeverage.includes(args[1]);
  }
  let isValidNumber = validateNumber(args[1]);
  return isValidOption && isValidNumber;
};

const validateNumber = function(number) {
  return typeof +number == "number" && +number % 1 == 0;
};

const validateQueryPair = function(args, path) {
  let isValidOption = expectedQueryOption.includes(args[0]);
  let transactions = JSON.parse(fs.readFileSync(path, "utf8"));
  isValidId = transactions[args[1]];
  return isValidOption && isValidId;
};

exports.validateQueryPair = validateQueryPair;
exports.validateSavePair = validateSavePair;
