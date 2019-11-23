const save = require("../src/save").save;
const assert = require("assert");

describe("test save funtion", function() {
  it("should insert new transaction and return the stringified value of it ", function() {
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n" +
      "\n" +
      10 +
      "," +
      "orange" +
      "," +
      1 +
      "," +
      "21-12-2000";
    assert.deepEqual(
      save({ "10": [] }, "orange", 10, 1, "21-12-2000", "./testForSave.json"),
      expected
    );
  });

  it("should insert transaction and return the strinfied data of it ", function() {
    const expected =
      "Transaction Record:\nEmployee ID,Beverage,Quantity,Date\n" +
      "\n" +
      111 +
      "," +
      "apple" +
      "," +
      1 +
      "," +
      "21-11-2000";
    const actualData = {
      "111": [{ beverage: "apple", qty: 1, date: "21-11-2000" }]
    };
    assert.deepEqual(
      save(actualData, "apple", 111, 1, "21-11-2000", "./testForSave.json"),
      expected
    );
  });
});
