const assert = require("assert");
const performCmd = require("../src/performOperation").performCmd;
const getPair = require("../src/performOperation").getPair;

describe("test for getPair function", function() {
  it("should pair the argument", function() {
    assert.deepStrictEqual(getPair(["--empId", "1111"]), [["--empId", "1111"]]);
  });

  it("should pair the arguments", function() {
    assert.deepStrictEqual(getPair(["--empId", "1111", "--qty", "1"]), [
      ["--empId", "1111"],
      ["--qty", "1"]
    ]);
  });
});

describe("test performcommand function for save command", function() {
  it("should validate and perform command based on arguments", function() {
    let fakeDate = new Date();
    expectedDate = fakeDate.toJSON();
    const writeIntoFile = function(path, newTransaction) {
      assert.deepEqual(path, "./juiceTransacDetails");
      assert.deepStrictEqual(newTransaction, [
        { empId: "1120", beverage: "Grapes", qty: "1", date: fakeDate }
      ]);
    };
    const dateGenerator = function() {
      return fakeDate;
    };

    const existingTrans = [];
    const usrArgs = [
      "--save",
      "--beverage",
      "Grapes",
      "--qty",
      "1",
      "--empId",
      "1120"
    ];

    expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1120,Grapes,1," +
      expectedDate;
    assert.deepStrictEqual(
      performCmd(
        existingTrans,
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      expected
    );
  });

  it("should validate and perform command based on arguments", function() {
    let fakeDate = new Date();
    expectedDate = fakeDate.toJSON();
    const writeIntoFile = function(path, newTransaction) {
      assert.deepEqual(path, "./juiceTransacDetails");
      assert.deepStrictEqual(newTransaction, [
        { empId: "1124", beverage: "Banana", qty: "2", date: fakeDate }
      ]);
    };
    const dateGenerator = function() {
      return fakeDate;
    };

    const existingTrans = [];
    const usrArgs = [
      "--save",
      "--beverage",
      "Banana",
      "--qty",
      "2",
      "--empId",
      "1124"
    ];

    expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1124,Banana,2," +
      expectedDate;
    assert.deepStrictEqual(
      performCmd(
        existingTrans,
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      expected
    );
  });

  it("should validate and return ERROR message when the arguments are not valid", function() {
    const usrArgs = ["--save", "--bvg", "Orange"];
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    assert.strictEqual(
      performCmd(
        [],
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      "Enter valid option"
    );
  });

  it("should validate and return ERROR message when the arguments are not valid", function() {
    const usrArgs = ["--save", "--beverage", "Orange"];
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    assert.strictEqual(
      performCmd(
        [],
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      "Enter valid option"
    );
  });

  it("should validate and return ERROR message when the arguments are not valid", function() {
    const usrArgs = [
      "--save",
      "--beverage",
      "Orange",
      "--qty",
      "1",
      "--empId",
      "-19"
    ];
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    assert.strictEqual(
      performCmd(
        [],
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      "Enter valid option"
    );
  });

  it("should validate and return ERROR message when the arguments are not valid", function() {
    const usrArgs = [
      "--save",
      "--beverage",
      "Tomato",
      "--qty",
      "1",
      "--empId",
      "1119"
    ];
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    assert.strictEqual(
      performCmd(
        [],
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile
      ),
      "Enter valid option"
    );
  });
});

describe("test performCommand function for query command", function() {
  it("should validate arguments and filter transactions based on empId", function() {
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    const existingTrans = [
      { empId: "1111", beverage: "Orange", qty: "1", date: "2019-11-01" }
    ];
    const usrArgs = ["--query", "--empId", "1111"];
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,1,2019-11-01\nTotal: 1 Juice";
    assert.strictEqual(
      performCmd(existingTrans, usrArgs, "./juiceTransaction", writeIntoFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on date", function() {
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    const existingTrans = [
      { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
      { empId: "1111", beverage: "Bangalore", qty: "1", date: "2019-10-02" }
    ];
    const usrArgs = ["--query", "--date", "2019-11-01"];
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\nTotal: 2 Juice";
    assert.strictEqual(
      performCmd(existingTrans, usrArgs, "./juiceTransaction", writeIntoFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on date and empId", function() {
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    const existingTrans = [
      { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
      { empId: "1112", beverage: "Bangalore", qty: "1", date: "2019-10-01" },
      { empId: "1111", beverage: "Banana", qty: "2", date: "2019-11-01" }
    ];
    const usrArgs = ["--query", "--date", "2019-11-01"];
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\n1111,Banana,2,2019-11-01\nTotal: 4 Juice";
    assert.strictEqual(
      performCmd(existingTrans, usrArgs, "./juiceTransaction", writeIntoFile),
      expected
    );
  });
});
