const {assert, expect} = require('chai');

const {Field} = require("../../dist/model/Field");
const {Type} = require("../../dist/model/Type");

describe("Model.Field class", () => {

  it("Create Field instance", () => {
    var data = new Field(Type.STRING, "field_name");
    assert.equal(data.type, Type.STRING, "Correct field type");
    assert.equal(data.name, "field_name", "Correct field name");
  });

  it("Create Field instance with incorrect type", () => {
    expect(()=>{
      new Field("wrong_type", "field_name")
    }).to.throw("invalid field type");
  });

  it("Create Field instance with empty name", () => {
    expect(()=>{
      new Field(Type.STRING, "")
    }).to.throw("ield name cannot be empty");
  });

});