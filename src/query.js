const fs = require("fs");

const getTotalJuice = function(totalJuice, empTransaction) {
  return totalJuice + +empTransaction.qty;
};

const getValue = function(empId) {
  return function(empTransaction) {
    const beverage = empTransaction.beverage;
    const qty = empTransaction.qty;
    const date = empTransaction.date;
    return empId + "," + beverage + "," + qty + "," + date;
  };
};

const getEmpTransaction = function(empId, path) {
  const allEmpDetails = JSON.parse(fs.readFileSync(path, "utf8"));
  const header = "Employee ID,Beverage,Quantity,Date\n";
  const empTransaction = allEmpDetails[empId];
  const totalJuice = allEmpDetails[empId].reduce(getTotalJuice, 0);
  const records = empTransaction.map(getValue(empId)).join("\n");
  return header + records + "\n" + "Total: " + totalJuice + " Juices";
};

exports.getEmpTransaction = getEmpTransaction;
exports.getTotalJuice = getTotalJuice;
exports.getValue = getValue;
