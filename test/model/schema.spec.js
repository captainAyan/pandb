const {assert} = require('chai');

const {Schema} = require("../../dist/model/Schema");
const {Field} = require("../../dist/model/Field");
const {Type} = require("../../dist/model/Type");
const {Tuple} = require("../../dist/model/Tuple");

describe("Model.Schema class", () => {

  it("Create a Schema", () => {
    var first_field_name = "id";
    var schema = new Schema();
    schema.addField(new Field(Type.PRIMARY_KEY, first_field_name));
    var data = schema.fields[0];
    assert.equal(data.name, first_field_name, "Correct field name");
  });

  describe("Schema.validateTupleToSchema() method", () => {
    var schema = new Schema();
    schema.addField(new Field(Type.PRIMARY_KEY, "id"));
    schema.addField(new Field(Type.STRING, "name"));
    schema.addField(new Field(Type.NUMBER, "likes"));
    schema.addField(new Field(Type.BOOLEAN, "is_admin"));

    it("Valid tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("1");
      tuple.addValue('`abc`');
      tuple.addValue("12");
      tuple.addValue("false");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), true, "Correct Schema");
    });

    it("Invalid size tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("1");
      tuple.addValue('`abc`');
      tuple.addValue("12");
      tuple.addValue("false");
      tuple.addValue("false");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid size tuple");
    });

    it("Invalid primary key data tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("one");
      tuple.addValue('`abc`');
      tuple.addValue("12");
      tuple.addValue("false");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid primary key");
    });

    it("Invalid negative primary key data tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("-1");
      tuple.addValue('`abc`');
      tuple.addValue("12");
      tuple.addValue("false");
      console.log(Schema.validateTupleToSchema(tuple, schema));
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid primary key");
    });

    it("Invalid string data tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("one");
      tuple.addValue('`abc');
      tuple.addValue("12");
      tuple.addValue("false");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid string");
    });

    it("Invalid number data tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("one");
      tuple.addValue('`abc`');
      tuple.addValue("abc");
      tuple.addValue("false");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid number");
    });

    it("Invalid boolean data tuple", () => {
      let tuple = new Tuple();
      tuple.addValue("one");
      tuple.addValue('`abc`');
      tuple.addValue("12");
      tuple.addValue("abc");
      assert.equal(Schema.validateTupleToSchema(tuple, schema), false, "Invalid boolean");
    });

  })

});