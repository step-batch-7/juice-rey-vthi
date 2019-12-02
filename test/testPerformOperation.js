const assert = require("assert");
const performCmd = require("../src/performOperation").performCmd;
const getPair = require("../src/performOperation").getPair;

describe("test for getPair function", () => {
  it("should pair the even number arguments", () => {
    assert.deepStrictEqual(getPair(["--empId", "1111"]), [["--empId", "1111"]]);
  });

  it("should pair the odd number of arguments", () => {
    const usrArgs = "--empId 1111 --qty 1 orange".split(" ");
    const expected = [
      ["--empId", "1111"],
      ["--qty", "1"],
      ["orange", undefined]
    ];
    assert.deepStrictEqual(getPair(usrArgs), expected);
  });
});

describe("test performcommand function for save command", () => {
  it("should validate and perform save when all the arguments are given", function() {
    const usrArgs = "--save --beverage Grapes --qty 1 --empId 1120".split(" ");
    const fakeDate = new Date();
    const expectedDate = fakeDate.toJSON();
    const writeIntoFile = function(path, newTransaction) {
      assert.deepEqual(path, "./juiceTransacDetails");
      assert.deepStrictEqual(newTransaction, [
        { empId: "1120", beverage: "Grapes", qty: "1", date: fakeDate }
      ]);
    };
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransacDetails");
      return [];
    };
    const dateGenerator = function() {
      return fakeDate;
    };

    expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1120,Grapes,1," +
      expectedDate;
    assert.deepStrictEqual(
      performCmd(
        usrArgs,
        "./juiceTransacDetails",
        readFile,
        dateGenerator,
        writeIntoFile
      ),
      expected
    );
  });

  it("should validate and perform save when all the arguments are given even if it is jumbled", function() {
    const usrArgs = "--save --qty 1 --empId 1122 --beverage Banana".split(" ");
    const fakeDate = new Date();
    const expectedDate = fakeDate.toJSON();
    const writeIntoFile = function(path, newTransaction) {
      assert.deepEqual(path, "./juiceTransacDetails");
      assert.deepStrictEqual(newTransaction, [
        { empId: "1122", beverage: "Banana", qty: "1", date: fakeDate }
      ]);
    };
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransacDetails");
      return [];
    };
    const dateGenerator = function() {
      return fakeDate;
    };

    expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n1122,Banana,1," +
      expectedDate;
    assert.deepStrictEqual(
      performCmd(
        usrArgs,
        "./juiceTransacDetails",
        readFile,
        dateGenerator,
        writeIntoFile
      ),
      expected
    );
  });

  it("should validate and return ERROR message when all the arguments are not given", function() {
    const usrArgs = ["--save", "--beverage", "Orange"];
    const readFile = function() {};
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransacDetails", readFile),
      "Enter valid option"
    );
  });

  it("should validate and return ERROR message when all the extra arguments are given", function() {
    const usrArgs = "--save --qty 1 --empId 1122 --beverage Banana --qty 2".split(
      " "
    );
    const readFile = function() {};
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransacDetails", readFile),
      "Enter valid option"
    );
  });

  it("should validate and give ERROR message when the arguments have negative numbers", function() {
    const usrArgs = [
      "--save",
      "--beverage",
      "Orange",
      "--qty",
      "1",
      "--empId",
      "-19"
    ];
    const readFile = function() {};
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransacDetails", readFile),
      "Enter valid option"
    );
  });

  it("should validate and return ERROR message when the arguments are Invalid", function() {
    const usrArgs = "--save --beverage Tomato --qty 1 --empId 1119".split(" ");
    const dateGenerator = function() {};
    const writeIntoFile = function() {};
    const readFile = function() {};
    assert.strictEqual(
      performCmd(
        usrArgs,
        "./juiceTransacDetails",
        dateGenerator,
        writeIntoFile,
        readFile
      ),
      "Enter valid option"
    );
  });
});

describe("test performCommand function for query command", function() {
  it("should validate arguments and filter transactions based on only date", function() {
    const usrArgs = "--query --date 2019-11-01".split(" ");
    const readFile = function(path) {
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
        { empId: "1111", beverage: "Bangalore", qty: "1", date: "2019-10-02" }
      ];
      return existingTrans;
    };

    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on only empId", function() {
    const usrArgs = "--query --empId 1111".split(" ");
    const readFile = function(path) {
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
        { empId: "1113", beverage: "Bangalore", qty: "1", date: "2019-10-02" }
      ];
      return existingTrans;
    };
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on only beverage", function() {
    const usrArgs = "--query --beverage Orange".split(" ");
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransaction");
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
        { empId: "1111", beverage: "Banana", qty: "1", date: "2019-10-02" }
      ];
      return existingTrans;
    };

    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on date and empId", () => {
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransaction");
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-11-01" },
        { empId: "1112", beverage: "Bangalore", qty: "1", date: "2019-10-01" },
        { empId: "1111", beverage: "Banana", qty: "2", date: "2019-11-02" }
      ];
      return existingTrans;
    };
    const usrArgs = "--query --date 2019-11-01 --empId 1111".split(" ");
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-11-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on date and beverage", () => {
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransaction");
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-03-01" },
        { empId: "1112", beverage: "Banana", qty: "1", date: "2019-10-01" },
        { empId: "1111", beverage: "Banana", qty: "2", date: "2019-04-01" }
      ];
      return existingTrans;
    };
    const usrArgs = "--query --date 2019-03-01 --beverage Orange".split(" ");
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-03-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on empId and beverage", () => {
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransaction");
      const existingTrans = [
        { empId: "1115", beverage: "Orange", qty: "2", date: "2019-03-01" },
        { empId: "1115", beverage: "Banana", qty: "1", date: "2019-10-01" },
        { empId: "1111", beverage: "Banana", qty: "2", date: "2019-04-01" }
      ];
      return existingTrans;
    };
    const usrArgs = "--query --empId 1115 --beverage Banana".split(" ");
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1115,Banana,1,2019-10-01\nTotal: 1 Juice";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });

  it("should validate arguments and filter transactions based on date,empId and beverage", () => {
    const readFile = function(path) {
      assert.strictEqual(path, "./juiceTransaction");
      const existingTrans = [
        { empId: "1111", beverage: "Orange", qty: "2", date: "2019-03-01" },
        { empId: "1112", beverage: "Banana", qty: "1", date: "2019-10-01" },
        { empId: "1111", beverage: "Banana", qty: "2", date: "2019-04-01" }
      ];
      return existingTrans;
    };
    const usrArgs = "--query --date 2019-03-01 --beverage Orange --empId 1111".split(
      " "
    );
    const expected =
      "Employee ID, Beverage, Quantity, Date\n1111,Orange,2,2019-03-01\nTotal: 2 Juices";
    assert.strictEqual(
      performCmd(usrArgs, "./juiceTransaction", readFile),
      expected
    );
  });
});
