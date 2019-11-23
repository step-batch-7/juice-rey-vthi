const fs = require("fs");

const getTransDetails = function(path) {
  const objects = JSON.parse(fs.readFileSync(path, "utf8"));
  return objects;
};

exports.getTransDetails = getTransDetails;
