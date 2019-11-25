const fs = require("fs");
const isNewEntry = function(existingRecords, idToLookAt) {
  return !Object.keys(existingRecords).includes(idToLookAt);
};

const writeIntoFile = function(path, newTransaction) {
  fs.writeFileSync(path, JSON.stringify(newTransaction), "utf8");
};

const insertNewTransac = function(existingTransac, empId, bvg, qty, date) {
  existingTransac[empId].push({ beverage: bvg, qty: qty, date: date });
  return existingTransac;
};

const save = function(details, bvg, empId, qty, date, path) {
  let header = "Transaction Record:\nEmployee ID,Beverage,Quantity,Date";
  if (isNewEntry(details, empId)) {
    details[empId] = [];
  }
  const updatedRecord = insertNewTransac(details, empId, bvg, qty, date);
  writeIntoFile(path, updatedRecord);
  return header + "\n" + empId + "," + bvg + "," + qty + "," + date;
};

exports.save = save;
exports.insertNewTransac = insertNewTransac;
