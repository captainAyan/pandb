const {assert, expect} = require('chai');

const {Schema} = require("../../dist/model/Schema");
const {Field} = require("../../dist/model/Field");
const {Type} = require("../../dist/model/Type");
const {Tuple} = require("../../dist/model/Tuple");
const {Table} = require("../../dist/model/Table");

describe("Model.Table class", () => {

  var name = "USERS";
  var schema = new Schema();
  schema.addField(new Field(Type.PRIMARY_KEY, "id"));
  schema.addField(new Field(Type.STRING, "name"));
  schema.addField(new Field(Type.NUMBER, "likes"));
  schema.addField(new Field(Type.BOOLEAN, "is_admin"));

  it("Create a Table with correct Tuples and Schema", () => {
    var table = new Table(name, schema);
    var tuple = new Tuple();
    tuple.addValue("1");
    tuple.addValue("`John Doe`");
    tuple.addValue("10");
    tuple.addValue("false");
    table.addTuple(tuple);

    assert.equal(table.name, name, "Correct Table name");
    assert.equal(table.schema, schema, "Correct Table Schema");

    assert.equal(table.tuples[0].values[0], "1", "Correct value in id column")
    assert.equal(table.tuples[0].values[1], "`John Doe`", "Correct value in name column")
    assert.equal(table.tuples[0].values[2], "10", "Correct value in likes column")
    assert.equal(table.tuples[0].values[3], "false", "Correct value in is_admin column")
  });

  it("Create a Table with incorrect Tuple", () => {
    var table = new Table(name, schema);
    var tuple = new Tuple();
    tuple.addValue("abc");
    tuple.addValue("`John Doe`");
    tuple.addValue("10");
    tuple.addValue("false");

    expect(()=>{
      table.addTuple(tuple);
    }).to.throw("tuple does not match with table schema");
  });

  it("Create a Table with empty table name", () => {
    expect(()=>{
      var table = new Table("", schema);
    }).to.throw("table name cannot be empty");
  });

});