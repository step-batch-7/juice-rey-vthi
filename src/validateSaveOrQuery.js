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
  const bits = date.split("-");
  const isValidYear = !(+bits[0] === 0);
  const isDateValid = new Date(bits[0], bits[1] - 1, bits[2]);
  return isDateValid && isDateValid.getMonth() + 1 == bits[1] && isValidYear;
};

const isvalidPair = function(existingTransac, usrArgs) {
  const isValidId =
    usrArgs[0] == "--empId" &&
    existingTransac.some(checkEmpId.bind(null, usrArgs[1]));

  const isValidBvg =
    usrArgs[0] == "--beverage" && expectedBeverage.includes(usrArgs[1]);

  return isValidId || isValidBvg || isValidDate(usrArgs[1]);
};

const validateQueryPair = function(pairedArgs, existingTransac) {
  const isValidOption = pairedArgs.every(
    isvalidPair.bind(null, existingTransac)
  );
  return isValidOption;
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

exports.validateSave = validateSave;
exports.validateQuery = validateQuery;
exports.validateQueryPair = validateQueryPair;
exports.validateSavePair = validateSavePair;
exports.validateNumber = validateNumber;
exports.isValidDate = isValidDate;
exports.isvalidPair = isvalidPair;
exports.checkEmpId = checkEmpId;
