const save = require("../src/save").save;
const insertNewTransac = require("../src/save").insertNewTransac;
const assert = require("assert");

describe("test save funtion", function() {
  it("should insert new transaction and return the stringified value of it ", function() {
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n10,Orange,1,21-12-2000";
    assert.deepEqual(
      save({ "10": [] }, "Orange", 10, 1, "21-12-2000", "./testForSave.json"),
      expected
    );
  });

  it("should insert transaction and return the strinfied data of it ", function() {
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n111,Apple,1,21-11-2000";
    const actualData = {
      "111": [{ beverage: "Apple", qty: 1, date: "21-11-2000" }]
    };
    assert.deepEqual(
      save(actualData, "Apple", 111, 1, "21-11-2000", "./testForSave.json"),
      expected
    );
  });

  it("shoud push new transaction of employee", function() {
    const expected = {
      "10": [{ beverage: "Orange", qty: 1, date: "01-01-2019" }]
    };
    const actualargs = assert.deepStrictEqual(
      insertNewTransac({ "10": [] }, 10, "Orange", 1, "01-01-2019"),
      expected
    );
  });

  it("shoud push new transaction with existing transaction", function() {
    const expected = {
      "10": [
        { beverage: "Orange", qty: 1, date: "01-01-2019" },
        { beverage: "Apple", qty: 2, date: "02-02-2019" }
      ]
    };
    const actualargs = assert.deepStrictEqual(
      insertNewTransac(
        { "10": [{ beverage: "Orange", qty: 1, date: "01-01-2019" }] },
        10,
        "Apple",
        2,
        "02-02-2019"
      ),
      expected
    );
  });
});
