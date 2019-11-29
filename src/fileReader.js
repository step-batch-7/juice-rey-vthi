const fs = require("fs");

const readFile = function(path) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", "utf8");
  }
  const objects = JSON.parse(fs.readFileSync(path, "utf8"));
  return objects;
};

const writeIntoFile = function(path, newTransaction) {
  fs.writeFileSync(path, JSON.stringify(newTransaction), "utf8");
};

const date = function() {
  return new Date();
};

exports.writeIntoFile = writeIntoFile;
exports.readFile = readFile;
exports.date = date;
