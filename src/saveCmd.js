const fs = require("fs");

const saveCmd = function(existingTrans, newTransaction, path, writeIntoFile) {
  existingTrans.push(newTransaction);
  writeIntoFile(path, existingTrans);
  return newTransaction;
};

exports.saveCmd = saveCmd;
