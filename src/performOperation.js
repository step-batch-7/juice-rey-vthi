const fs = require("fs");

const { validateSave, validateQuery } = require("./validateSaveOrQuery");
const saveCmd = require("./saveCmd").saveCmd;
const queryCmd = require("./queryCmd").queryCmd;

const performCmd = function(args, path, readFile, date, writeFile) {
  const pairedArgs = getPair(args.slice(1));
  const option = args[0];
  const transObj = readFile(path);
  const isValidSaveCmd =
    option == "--save" && validateSave(pairedArgs, args.length);
  const isValidQueryCmd =
    option == "--query" && validateQuery(pairedArgs, args.length, transObj);
  const isValidArgs = isValidQueryCmd || isValidSaveCmd;
  if (!isValidArgs) {
    return "Enter valid option";
  }
  return commands[option](args, transObj, path, writeFile, date);
};

const getPair = function(cmdLine) {
  let pairedArgs = [];
  for (let argmnt = 0; argmnt < cmdLine.length; argmnt = argmnt + 2) {
    pairedArgs.push([cmdLine[argmnt], cmdLine[argmnt + 1]]);
  }
  return pairedArgs;
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
  numberOfJuice > 1 ? (juiceFormat = "Juices") : (juiceFormat = "Juice");
  return `${header}${formattedRecords}\nTotal: ${numberOfJuice} ${juiceFormat}`;
};

const formatOneTransac = function(transaction) {
  return `${transaction.empId},${transaction.beverage},${transaction.qty},${transaction.date}`;
};

const saveCmdCall = function(args, existrans, path, writeFile, date) {
  const newTrans = saveArgs(args, date);
  const transactionRecords = saveCmd(existrans, newTrans, path, writeFile);
  return formatSaveRecord(transactionRecords);
};
const queryCmdCall = function(args, existrans) {
  const usrArgs = queryArgs(args.slice(1));
  const transactionRecords = queryCmd(usrArgs, existrans);
  const numberOfJuice = transactionRecords.reduce(getTotalNumberOfJuice, 0);
  return formatQueryRecord(transactionRecords, numberOfJuice);
};

const commands = { "--save": saveCmdCall, "--query": queryCmdCall };
exports.getPair = getPair;
exports.performCmd = performCmd;
