const assert = require("assert");
const fs = require("fs");
const validateSavePair = require("../src/validateSaveOrQuery").validateSavePair;
const validateQueryPair = require("../src/validateSaveOrQuery")
  .validateQueryPair;

describe("validate option", function() {
  it("should validate save option", function() {
    assert.ok(
      [
        ["--beverage", "orange"],
        ["--empId", "111"],
        ["--qty", "1"]
      ].every(validateSavePair)
    );
  });
  it("should validate save option, when the options are not in order", function() {
    assert.ok(
      [
        ["--empId", "111"],
        ["--beverage", "apple"],
        ["--qty", "3"]
      ].every(validateSavePair)
    );
  });
  it("should validate save option and return false value", function() {
    assert.ok(
      ![
        ["--empId", "111"],
        ["--beverage", "app"],
        ["--qty", "3"]
      ].every(validateSavePair)
    );
  });

  it("should validate save options, when they are not in order and wrong option", function() {
    assert.ok(
      ![
        ["--empId", "orange"],
        ["--beverage", "apple"],
        ["--qty", "3"]
      ].every(validateSavePair)
    );
  });
});
