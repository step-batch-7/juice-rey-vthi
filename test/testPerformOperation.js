const getPair = require("../src/performOperation").getPair;
const performOperation = require("../src/performOperation").performOperation;
const assert = require("assert");

describe("get paired argument", function() {
  it("should pair the arguments", function() {
    const expected = [
      ["--beverage", "orange"],
      ["--empId", "11111"],
      ["--qty", "1"]
    ];
    assert.deepStrictEqual(
      getPair(["--beverage", "orange", "--empId", "11111", "--qty", "1"]),
      expected
    );
  });

  it("should pair the arguments when the arguments length is odd", function() {
    const expected = [
      ["--beverage", "orange"],
      ["--empId", "11111"],
      ["--qty", undefined]
    ];
    assert.deepStrictEqual(
      getPair(["--beverage", "orange", "--empId", "11111", "--qty"]),
      expected
    );
  });
});

describe("perform query operation", function() {
  it("should validate options and decide to perform query operation", function() {
    const actualArgs = ["--query", "--empId", "111"];
    const actualObject = {
      "111": [{ beverage: "Apple", qty: 1, date: "21-11-2000" }]
    };
    const date = new Date();
    const expected =
      "Employee ID,Beverage,Quantity,Date\n111,Apple,1,21-11-2000\nTotal: 1 Juices";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });
  it("should not query when the employee id doesn't exist in the record", function() {
    const actualArgs = ["--query", "--empId", "111"];
    const actualObject = {
      "111": [{ beverage: "Apple", qty: 1, date: "21-11-2000" }],
      "112": [
        { beverage: "Apple", qty: 1, date: "21-11-2000" },
        { beverage: "Apple", qty: 1, date: "21-11-2000" }
      ]
    };
    const date = new Date();
    const expected =
      "Employee ID,Beverage,Quantity,Date\n111,Apple,1,21-11-2000\nTotal: 1 Juices";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not query when the employee id doesn't exist in the record", function() {
    const actualArgs = ["--query", "--empId", "113"];
    const actualObject = {};
    const date = new Date();
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not query when the multiple employee id is given", function() {
    const actualArgs = ["--query", "--empId", "113", "--empId", "112"];
    const actualObject = {};
    const date = new Date();
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not query option when the required feild is not given ", function() {
    const actualArgs = ["--query", "--empId", "113", "--beverage", "Banana"];
    const actualObject = {};
    const date = new Date();
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });
});

describe("perform save operation", function() {
  it("should validate options and decide to perform save operation", function() {
    const actualArgs = [
      "--save",
      "--beverage",
      "Apple",
      "--qty",
      "1",
      "--empId",
      "115"
    ];
    const actualObject = {};
    const date = "21-12-2000";
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n115,Apple,1,21-12-2000";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should validate options and decide to perform save operation", function() {
    const actualArgs = [
      "--save",
      "--beverage",
      "Banana",
      "--qty",
      "2",
      "--empId",
      "115"
    ];
    const actualObject = {};
    const date = "1-2-2000";
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n115,Banana,2,1-2-2000";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not validate save wrong options ", function() {
    const actualArgs = [
      "--sav",
      "--beverage",
      "Apple",
      "--qty",
      "1",
      "--empId",
      "115"
    ];
    const actualObject = {};
    const date = "21-12-2000";
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not validate save wrong options ", function() {
    const actualArgs = ["--save", "--empId", "115"];
    const actualObject = {};
    const date = "21-12-2000";
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not validate save options, when the options are jumbled ", function() {
    const actualArgs = [
      "--save",
      "--empId",
      "115",
      "--qty",
      "1",
      "--beverage",
      "Apple"
    ];
    const actualObject = {};
    const date = "21-12-2000";
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n115,Apple,1,21-12-2000";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });
  it("should not validate save options, when the options are more", function() {
    const actualArgs = [
      "--save",
      "--empId",
      "115",
      "--qty",
      "1",
      "--beverage",
      "Apple",
      "--empId",
      "112"
    ];
    const actualObject = {};
    const date = "21-12-2000";
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });

  it("should not save transaction when the required feild is not given ", function() {
    const actualArgs = ["--save", "--empId", "113", "--beverage", "Banana"];
    const actualObject = {};
    const date = new Date();
    const expected = "Enter valid option";
    assert.deepEqual(
      performOperation(actualObject, actualArgs, "./testForSave.json", date),
      expected
    );
  });
});
