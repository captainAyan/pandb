const {assert} = require('chai');

const {RegexHelper} = require("../../dist/parser/RegexHelper");

describe("Parser.RegexHelper class", () => {

  describe("RegexHelper.getNumberFromTupleString() method", () => {
    
    it("Get integer number", ()=> {
      var data = "1,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "1",  "Correct integer number");
    });
  
    it("Get float number", () => {
      var data = "1.22,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "1.22", "Correct float number");
    });
  
    it("Get positive integer number", ()=> {
      var data = "+1,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "+1",  "Correct integer number");
    });
  
    it("Get positive float number", () => {
      var data = "+1.22,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "+1.22", "Correct float number");
    });
  
    it("Get negative integer number", () => {
      var data = "-1,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "-1", "Correct negative float number");
    });
  
    it("Get negative float number", () => {
      var data = "-1.22,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, "-1.22", "Correct negative float number");
    });

    it("Invalid floating number", () => {
      var data = "1.2.2,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, null, "Too many points in float number");

      var data1 = "1.2a,`some string`,false,";
      var res1 = RegexHelper.getNumberFromTupleString(data1);
      assert.equal(res1, null, "Alphabet in float number");

      var data2 = "1.2@,`some string`,false,";
      var res2 = RegexHelper.getNumberFromTupleString(data2);
      assert.equal(res2, null, "Symbol in float number");
    });

    it("Invalid integer number", () => {
      var data = "a1a,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, null, "Alphabet in integer number");

      var data1 = "1@,`some string`,false,";
      var res1 = RegexHelper.getNumberFromTupleString(data1);
      assert.equal(res1, null, "Symbol in integer number");
    });

    it("Correct number but illegal spacing", () => {
      var data = " 1,`some string`,false,";
      var res = RegexHelper.getNumberFromTupleString(data);
      assert.equal(res, null, "Front illegal spacing");
      
      var data1 = "1 ,`some string`,false,";
      var res1 = RegexHelper.getNumberFromTupleString(data1);
      assert.equal(res1, null, "Back illegal spacing");
    });

  });

  describe("RegexHelper.getStringFromTupleString() method", () => {

    it("Get normal string", () => {
      var data = "`some string`,false,1,";
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, "some string", "Illegal string format");
    });

    it("Invalid backtick in string (opening)", () => {
      var data1 = "some string`,false,1,";
      var res1 = RegexHelper.getStringFromTupleString(data1);
      assert.equal(res1, null, "Illegal opening backtick");
    });

    it("Invalid backtick in string (closing)", () => {
      var data = "`some string,false,1,";
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, null, "Illegal closing backtick");
    });

    it("Invalid string format", () => {
      var data = "`some `string,false,1,";
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, null, "Illegal string backtick");
    });

    it("Testing empty value string", () => {
      var data = "``,1,false,";
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, "", "Illegal string backtick");
    });

    it("String did not start from the beginning", () => {
      var data = "false,`hello world`,1,";
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, null, "Illegal string backtick");
    });

    it("Testing string escape", () => {
      var data = "`something %2560some%60thing%60`,false,1"
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, "something %60some`thing`", "Illegal string backtick");
    });

    it("Testing invalid string escape character", () => {
      var data = "`something %12 something`,false,1"
      var res = RegexHelper.getStringFromTupleString(data);
      assert.equal(res, null, "Illegal string backtick");
    });

  });

  describe("RegexHelper.getBooleanFromTupleString() method", () => {

    it("Valid boolean token (true)", () => {
      var data = "true,1,`some string`";
      var res = RegexHelper.getBooleanFromTupleString(data);
      assert.equal(res, "true", "Valid token (True)");
    });

    it("Valid boolean token (false)", () => {
      var data = "false,1,`some string`";
      var res = RegexHelper.getBooleanFromTupleString(data);
      assert.equal(res, "false", "Valid token (False)");
    });

    it("Invalid boolean token", () => {
      var data = "abc,1,`some string`";
      var res = RegexHelper.getBooleanFromTupleString(data);
      assert.equal(res, null, "Invalid token")
    });

    it("Invalid boolean token case-sensitivity test", () => {
      var data = "TRUE,1,`some string`";
      var res = RegexHelper.getBooleanFromTupleString(data);
      assert.equal(res, null, "Invalid token")

      var data1 = "FALSE,1,`some string`";
      var res1 = RegexHelper.getBooleanFromTupleString(data1);
      assert.equal(res1, null, "Invalid token")
    });
    
  });

});