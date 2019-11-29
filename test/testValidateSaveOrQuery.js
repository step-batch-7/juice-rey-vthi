const assert = require("assert");
const validateSavePair = require("../src/validateSaveOrQuery").validateSavePair;
const validateNumber = require("../src/validateSaveOrQuery").validateNumber;
const isValidDate = require("../src/validateSaveOrQuery").isValidDate;
const validateQueryPair = require("../src/validateSaveOrQuery")
  .validateQueryPair;

describe("test validate number function", function() {
  it("should validate any positive number", function() {
    assert.ok(validateNumber("1111"));
  });
  it("should not validate floating point number", function() {
    assert.ok(!validateNumber("11.11"));
  });
  it("should not validate negative number", function() {
    assert.ok(!validateNumber("-1111"));
  });
  it("should not validate other than number", function() {
    assert.ok(!validateNumber("1111ee"));
  });
});

describe("test for validate query pair function", function() {
  it("should return true only when the given empId argument is present in transaction record", function() {
    const pairedArgs = [["--empId", "1111"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should return true only when empId emargument is valid, and present in transactions", function() {
    const pairedArgs = [["--empId", "1112"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should return true only when empId argument is valid, and present in transactions", function() {
    const pairedArgs = [["--empId", "1113"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(!validateQueryPair(pairedArgs, existingTransac));
  });

  it("should return true only when date argument is valid, and present in transactions", function() {
    const pairedArgs = [["--date", "2000-10-2"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should return true only when date argument is valid, and present in transactions", function() {
    const pairedArgs = [["--date", "2000-10-1"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should not return true when the date is Invalid", function() {
    const pairedArgs = [["--date", "2000-10-32"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(!validateQueryPair(pairedArgs, existingTransac));
  });

  it("should not return true when the month is Invalid", function() {
    const pairedArgs = [["--date", "2000-13-3"]];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(!validateQueryPair(pairedArgs, existingTransac));
  });

  it("should validate both the args and return true when the empId is present or date is valid", function() {
    const pairedArgs = [
      ["--date", "2000-10-2"],
      ["--empId", "1111"]
    ];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should validate both the args and return true when the empId is present or date is valid", function() {
    const pairedArgs = [
      ["--empId", "1112"],
      ["--date", "2000-10-1"]
    ];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" },
      { empId: "1112", beverage: "Grapes", qty: "1", date: "2000-10-1" }
    ];
    assert.ok(validateQueryPair(pairedArgs, existingTransac));
  });

  it("should validate both the args and return true when the empId is present or date is valid", function() {
    const pairedArgs = [
      ["--empId", "1112"],
      ["--date", "2000-10-1"]
    ];
    const existingTransac = [
      { empId: "1111", beverage: "Grapes", qty: "1", date: "2000-10-2" }
    ];
    assert.ok(!validateQueryPair(pairedArgs, existingTransac));
  });
});

describe("test for validate save pair function", function() {
  it("should return true only when emp argument is valid", function() {
    assert.ok(validateSavePair(["--empId", "1111"]));
  });

  it("should return true only when qty arguments is valid", function() {
    assert.ok(validateSavePair(["--qty", "1"]));
  });

  it("should return true only when beverage argument is valid", function() {
    assert.ok(validateSavePair(["--beverage", "Orange"]));
  });

  it("should return false, when beverage argument is not valid", function() {
    assert.ok(!validateSavePair(["--beverage", "Carrot"]));
  });

  it("should return false, when empId argument is not valid", function() {
    assert.ok(!validateSavePair(["--beverage", "Carrot"]));
  });

  it("should return false, when quantity argument is not valid", function() {
    assert.ok(!validateSavePair(["--beverage", "Carrot"]));
  });
});

describe("test isValid Date", function() {
  it("should return true when date is valid", function() {
    assert.ok(isValidDate("2019-2-2"));
  });

  it("should return false when date is valid", function() {
    assert.ok(!isValidDate("2019-2-32"));
  });
});
