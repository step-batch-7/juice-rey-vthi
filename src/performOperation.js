const fs = require("fs");
const validateSavePair = require("./validateSaveOrQuery").validateSavePair;
const validateQueryPair = require("./validateSaveOrQuery").validateQueryPair;
const saveCmd = require("./saveCmd").saveCmd;
const queryCmd = require("./queryCmd").queryCmd;

const performCmd = function(args, path, readFile, date, writeIntoFile) {
  const pairedArgs = getPair(args.slice(1));
  const transObj = readFile(path);
  const isValidSaveCmd = validateSave(pairedArgs, args.length);
  const isValidQueryCmd = validateQuery(pairedArgs, args.length, transObj);
  if (args[0] == "--save" && isValidSaveCmd) {
    const newTransaction = saveArgs(args, date);
    const transactionRecords = saveCmd(
      transObj,
      newTransaction,
      path,
      writeIntoFile
    );
    return formatSaveRecord(transactionRecords);
  }
  if (args[0] == "--query" && isValidQueryCmd) {
    const usrArgs = queryArgs(args.slice(1));
    const transactionRecords = queryCmd(usrArgs, transObj);
    const numberOfJuice = transactionRecords.reduce(getTotalNumberOfJuice, 0);
    return formatQueryRecord(transactionRecords, numberOfJuice);
  }
  return "Enter valid option";
};

const getPair = function(cmdLine) {
  let pairedArgs = [];
  for (let argmnt = 0; argmnt < cmdLine.length; argmnt = argmnt + 2) {
    pairedArgs.push([cmdLine[argmnt], cmdLine[argmnt + 1]]);
  }
  return pairedArgs;
};

const validateSave = function(pairedArgs, argLength) {
  const isValidSaveLength = validateLength(argLength, [7]);
  const isValidSaveOption = pairedArgs.every(validateSavePair);
  return isValidSaveLength && isValidSaveOption;
};

const validateQuery = function(pairedArgs, argsLength, transacObj) {
  const isValidQueryOption = validateQueryPair(pairedArgs, transacObj);
  const isValidQueryLength = validateLength(argsLength, [5, 3, 7]);
  return isValidQueryLength && isValidQueryOption;
};

const validateLength = function(actualLength, expectedLength) {
  return expectedLength.includes(actualLength);
};

const saveArgs = function(args, date) {
  const bvg = args[args.indexOf("--beverage") + 1];
  const empId = args[args.indexOf("--empId") + 1];
  const qty = args[args.indexOf("--qty") + 1];
  const newdate = date();
  return { empId: empId, beverage: bvg, qty: qty, date: newdate };
};

const queryArgs = function(args) {
  let cmdLine = [];
  for (let pos = 1; pos < args.length; pos = pos + 2) {
    cmdLine.push(args[pos]);
  }
  return cmdLine;
};

const getTotalNumberOfJuice = function(totalJuice, empTransaction) {
  return totalJuice + +empTransaction.qty;
};

const formatSaveRecord = function(transaction) {
  const header = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  return `${header}\n${transaction.empId},${transaction.beverage},${
    transaction.qty
  },${transaction.date.toJSON()}`;
};

const formatQueryRecord = function(transactions, numberOfJuice) {
  const header = "Employee ID, Beverage, Quantity, Date\n";
  const formattedRecords = transactions.map(formatOneTransac).join("\n");
  return `${header}${formattedRecords}\nTotal: ${numberOfJuice} Juice`;
};

const formatOneTransac = function(transaction) {
  return `${transaction.empId},${transaction.beverage},${transaction.qty},${transaction.date}`;
};

exports.getPair = getPair;
exports.performCmd = performCmd;
