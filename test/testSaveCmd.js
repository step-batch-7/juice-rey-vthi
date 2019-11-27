const assert = require("assert");
const saveCmd = require("../src/saveCmd").saveCmd;

describe("test saveCmd ", function() {
  it("should insert and return new transaction ", function() {
    const writeIntoFile = function(path, newRecords) {
      assert.strictEqual(path, "./juiceTransacDetails.json");
      const expected = [
        {
          empId: "1111",
          beverage: "Pomogranate",
          qty: "2",
          date: "2019-11-27T09:35:04.792Z"
        }
      ];
      assert.deepStrictEqual(newRecords, expected);
    };
    const expected = {
      empId: "1111",
      beverage: "Pomogranate",
      qty: "2",
      date: "2019-11-27T09:35:04.792Z"
    };
    assert.deepStrictEqual(
      saveCmd(
        [],
        {
          empId: "1111",
          beverage: "Pomogranate",
          qty: "2",
          date: "2019-11-27T09:35:04.792Z"
        },
        "./juiceTransacDetails.json",
        writeIntoFile
      ),
      expected
    );
  });

  it("should insert and return new transaction into existing object", function() {
    const writeIntoFile = function(path, newRecords) {
      assert.strictEqual(path, "./juiceTransacDetails.json");
      const expected = [
        {
          empId: "1112",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        }
      ];
      assert.deepStrictEqual(newRecords, expected);
    };
    const expected = {
      empId: "1112",
      beverage: "Orange",
      qty: "1",
      date: "2019-11-28T09:35:04.792Z"
    };
    assert.deepStrictEqual(
      saveCmd(
        [],
        {
          empId: "1112",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        },
        "./juiceTransacDetails.json",
        writeIntoFile
      ),
      expected
    );
  });

  it("should push new transaction into existing object, when that employee already has transactions ", function() {
    const writeIntoFile = function(path, newRecords) {
      assert.strictEqual(path, "./juiceTransacDetails.json");
      const expected = [
        {
          empId: "1112",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        }
      ];
      assert.deepStrictEqual(newRecords, expected);
    };
    const expected = {
      empId: "1112",
      beverage: "Orange",
      qty: "1",
      date: "2019-11-28T09:35:04.792Z"
    };
    assert.deepStrictEqual(
      saveCmd(
        [],
        {
          empId: "1112",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        },
        "./juiceTransacDetails.json",
        writeIntoFile
      ),
      expected
    );
  });

  it("should push new transaction into existing object,when empId doesnt had any transactions before", function() {
    const writeIntoFile = function(path, newRecords) {
      assert.strictEqual(path, "./juiceTransacDetails.json");
      const expected = [
        {
          empId: "1113",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        }
      ];
      assert.deepStrictEqual(newRecords, expected);
    };
    const expected = {
      empId: "1113",
      beverage: "Orange",
      qty: "1",
      date: "2019-11-28T09:35:04.792Z"
    };
    assert.deepStrictEqual(
      saveCmd(
        [],
        {
          empId: "1113",
          beverage: "Orange",
          qty: "1",
          date: "2019-11-28T09:35:04.792Z"
        },
        "./juiceTransacDetails.json",
        writeIntoFile
      ),
      expected
    );
  });
});
