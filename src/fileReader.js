const fs = require("fs");
const encoding = "utf8";
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

exports.writeIntoFile = writeIntoFile;
exports.readFile = readFile;
