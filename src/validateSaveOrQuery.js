const expectedSaveOption = ["--beverage", "--empId", "--qty"];
const expectedBeverage = ["Orange", "Apple", "Pomogranate", "Grapes", "Banana"];

const validateSavePair = function(args) {
  let isValidOption = expectedSaveOption.includes(args[0]);
  if (args[0] == "--beverage") {
    return expectedBeverage.includes(args[1]);
  }
  let isValidNumber = validateNumber(args[1]);
  return isValidOption && isValidNumber;
};

const validateNumber = function(number) {
  return +number > 0 && +number % 1 == 0;
};

const checkEmpId = function(empId, transactions) {
  return transactions["empId"] == empId;
};

const isValidDate = function(date) {
  let bits = date.split("-");
  if (+bits[0] === 0) {
    return false;
  }
  let isDateValid = new Date(bits[0], bits[1] - 1, bits[2]);
  return isDateValid && isDateValid.getMonth() + 1 == bits[1];
};

const isvalidPair = function(existingTransac, usrArgs) {
  console.log(usrArgs);
  if (usrArgs[0] == "--empId") {
    const isValidId = existingTransac.some(checkEmpId.bind(null, usrArgs[1]));
    return isValidId;
  }
  if (usrArgs[0] == "--beverage") {
    return expectedBeverage.includes(usrArgs[1]);
  }
  return isValidDate(usrArgs[1]);
};

const validateQueryPair = function(pairedArgs, existingTransac) {
  const isValidOption = pairedArgs.every(
    isvalidPair.bind(null, existingTransac)
  );
  return isValidOption;
};

exports.validateQueryPair = validateQueryPair;
exports.validateSavePair = validateSavePair;
exports.validateNumber = validateNumber;
exports.isValidDate = isValidDate;
exports.isvalidPair = isvalidPair;
exports.checkEmpId = checkEmpId;
