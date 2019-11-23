const assert = require("assert");
const fs = require("fs");
const getTotalJuice = require("../src/query").getTotalJuice;
const getValue = require("../src/query").getValue;

describe("test total juice", function() {
  it("should return total qty by adding all the count in each transaction", function() {
    const actualInput = [
      { beverage: "orange", qty: 3, date: "21-12-2000" },
      { beverage: "apple", qty: 1, date: "22-12-2000" }
    ];
    assert.strictEqual(actualInput.reduce(getTotalJuice, 0), 4);
  });

  it("should return qty for even it has one transaction", function() {
    const actualInput = [{ beverage: "orange", qty: 1, date: "21-12-2000" }];
    assert.strictEqual(actualInput.reduce(getTotalJuice, 0), 1);
  });

  it("should return total qty for the transactions that have more than 1", function() {
    actualInput = [
      { beverage: "orange", qty: 2, date: "21-12-2000" },
      { beverage: "apple", qty: 1, date: "22-12-2000" },
      { beverage: "grapes", qty: 2, date: "12-1-2019" }
    ];
    assert.strictEqual(actualInput.reduce(getTotalJuice, 0), 5);
  });
});

describe("test query function", function() {
  it("should return string that contains all value of any transaction", function() {
    const actualInput = [
      { beverage: "orange", qty: 2, date: "21-12-2000" },
      { beverage: "apple", qty: 1, date: "22-12-2000" }
    ];
    let expected = ["10,orange,2,21-12-2000", "10,apple,1,22-12-2000"];
    assert.deepStrictEqual(actualInput.map(getValue(10)), expected);
  });

  it("should return string that contains all values of one transaction", function() {
    const actualInput = [{ beverage: "grapes", qty: 2, date: "18-12-2019" }];
    const expected = ["23,grapes,2,18-12-2019"];
    assert.deepStrictEqual(actualInput.map(getValue(23)), expected);
  });

  it("should return string that contains all values of more transaction", function() {
    const actualInput = [
      { beverage: "orange", qty: 2, date: "21-12-2000" },
      { beverage: "apple", qty: 1, date: "01-06-2019" },
      { beverage: "pomogranate", qty: 1, date: "05-07-2019" }
    ];
    const expected = [
      "111,orange,2,21-12-2000",
      "111,apple,1,01-06-2019",
      "111,pomogranate,1,05-07-2019"
    ];
    assert.deepStrictEqual(actualInput.map(getValue(111)), expected);
  });
});
