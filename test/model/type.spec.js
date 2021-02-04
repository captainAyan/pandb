const {assert} = require('chai');

const {Type} = require("../../dist/model/Type");

describe("Model.Type class", () => {

  it("Correct PRIMARY_KEY data type", () => {
    assert.equal(Type.PRIMARY_KEY, "PK", "Correct field data type");
  });

  it("Correct NUMBER data type", () => {
    assert.equal(Type.NUMBER, "NUM", "Correct field data type");
  });

  it("Correct STRING data type", () => {
    assert.equal(Type.STRING, "STR", "Correct field data type");
  });

  it("Correct BOOLEAN data type", () => {
    assert.equal(Type.BOOLEAN, "BOOL", "Correct field data type");
  });

});