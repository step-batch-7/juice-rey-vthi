const getPair = require("../src/performOperation").getPair;
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
