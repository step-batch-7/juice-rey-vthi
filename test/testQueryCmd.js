const queryCmd = require("../src/queryCmd").queryCmd;
const assert = require("assert");

describe("test queryCmd funtion", function() {
  it("should filter transaction based on employee Id", function() {
    const usrArgs = ["1111"];
    const existingTransactions = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    expected = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), expected);
  });

  it("should filter transaction based on employee Id, when there are more than one transactons", function() {
    const usrArgs = ["1111"];
    const existingTransactions = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      },
      {
        empId: "1111",
        beverage: "Banana",
        qty: "2",
        date: "2019-11-27T06:44:12.454Z"
      },
      {
        empId: "1113",
        beverage: "Banana",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    expected = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      },
      {
        empId: "1111",
        beverage: "Banana",
        qty: "2",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), expected);
  });

  it("should filter transaction based on date", function() {
    const usrArgs = ["2019-11-27"];
    const existingTransactions = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    expected = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), expected);
  });

  it("should filter transaction based on date,when there is more transactions in that particular date", function() {
    const usrArgs = ["2019-11-26"];
    const existingTransactions = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-27T06:44:12.454Z"
      },
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      },
      {
        empId: "1112",
        beverage: "Banana",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    expected = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      },
      {
        empId: "1112",
        beverage: "Banana",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), expected);
  });

  it("should filter record based on date and emploree Id", function() {
    const usrArgs = ["1112", "2019-11-26"];
    const existingTransactions = [
      {
        empId: "1111",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      },
      {
        empId: "1112",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      },
      {
        empId: "1112",
        beverage: "Banana",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];

    const expected = [
      {
        empId: "1112",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      },
      {
        empId: "1112",
        beverage: "Banana",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), expected);
  });

  it("should not return any transaction, when that doesn't match any date of the record", function() {
    const usrArgs = ["2019-11-20"];
    const existingTransactions = [
      {
        empId: "1112",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), []);
  });

  it("should not return any transaction, when that doesn't match any empId of the record", function() {
    const usrArgs = ["1111"];
    const existingTransactions = [
      {
        empId: "1112",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), []);
  });

  it("should not return any transaction, when that doesn't match any userArgument in the record", function() {
    const usrArgs = ["1111", "2019-11-21"];
    const existingTransactions = [
      {
        empId: "1112",
        beverage: "Orange",
        qty: "1",
        date: "2019-11-26T06:44:12.454Z"
      }
    ];
    assert.deepStrictEqual(queryCmd(usrArgs, existingTransactions), []);
  });
});
