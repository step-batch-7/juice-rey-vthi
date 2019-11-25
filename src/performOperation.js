const validateSavePair = require("./validateSaveOrQuery").validateSavePair;
const validateQueryPair = require("./validateSaveOrQuery").validateQueryPair;
const save = require("./save").save;
const fs = require("fs");
const query = require("./query").getEmpTransaction;
const transactions = require("./existingEmpsJuiceTRansDetails").getTransDetails;

const getPair = function(cmdLine) {
  let pairedArgs = [];
  for (let argmnt = 0; argmnt < cmdLine.length; argmnt = argmnt + 2) {
    pairedArgs.push([cmdLine[argmnt], cmdLine[argmnt + 1]]);
  }
  return pairedArgs;
};

const validateLength = function(args, expectedLength) {
  return args.length == expectedLength;
};

const fileExist = function(path) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, {}, "utf8");
  }
  return transactions(path);
};

const performOperation = function(transObj, args, path, date) {
  const cmdLine = getPair(args.slice(1));
  const isValidSaveOption = cmdLine.every(validateSavePair);
  const isValidQueryOption = validateQueryPair(args.slice(1), path);
  const isValidSaveLength = validateLength(args, 7);
  const isValidQueryLength = validateLength(args, 3);

  if (args[0] == "--save" && isValidSaveLength && isValidSaveOption) {
    const bvg = args[args.indexOf("--beverage") + 1];
    const empId = args[args.indexOf("--empId") + 1];
    const qty = args[args.indexOf("--qty") + 1];
    return save(transObj, bvg, empId, qty, date, path);
  }
  if (args[0] == "--query" && isValidQueryLength && isValidQueryOption) {
    const empId = args[args.indexOf("--empId") + 1];
    return query(empId, path);
  }
  return "Enter valid option";
};

exports.getPair = getPair;
exports.fileExist = fileExist;
exports.performOperation = performOperation;
