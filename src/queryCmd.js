const isMatchingFields = function(args, transaction) {
  let oneTransac = transaction;
  const currentDate = oneTransac.date;
  oneTransac.date = currentDate.slice(0, 10);
  let isPresent = true;
  for (let pos = 0; pos < args.length; pos++) {
    isPresent = isPresent && Object.values(oneTransac).includes(args[pos]);
  }
  oneTransac.date = currentDate;
  return isPresent;
};

const queryCmd = function(args, allEmpDetails) {
  const filteredTransac = allEmpDetails.filter(
    isMatchingFields.bind(null, args)
  );
  return filteredTransac;
};

exports.queryCmd = queryCmd;
