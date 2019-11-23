const fs = require("fs");
const isNewEntry = function(existingRecords, idToLookAt) {
  return !Object.keys(existingRecords).includes(idToLookAt);
};

const writeIntoFile = function(path, newTransaction) {
  fs.writeFileSync(path, JSON.stringify(newTransaction), "utf8");
};

const save = function(details, bvg, empId, qty, date, path) {
  let header = "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n";
  if (isNewEntry(details, empId)) {
    details[empId] = [];
  }
  details[empId].push({ beverage: bvg, qty: qty, date: date });
  writeIntoFile(path, details);
  return header + "\n" + empId + "," + bvg + "," + qty + "," + date;
};

exports.save = save;
