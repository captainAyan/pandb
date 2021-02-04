const {assert, expect} = require('chai');

const {Parser} = require("../../dist/parser/Parser");

describe("Parser.Parser class", () => {

  it("Correct values", () => {
    let data = `USERS::(PK:id,STR:name,BOOL:male)
    (1,\`something\`,true,)
    (2,\`something 1\`,false,)
    (3,\`something 2\`,false,)
    POSTS::(PK:id,NUM:user_id,STR:message)
    (1,3,\`something 3\`,)
    (-2,2,\`something 4\`,)
    (3,3,\`something 5\`,)`;

    var tables  = (new Parser()).start(data);

    assert.equal(tables[0].tuples[0].values[0], "1", "Correct value in primary key column")
    assert.equal(tables[0].tuples[0].values[1], "something", "Correct value in string column")
    assert.equal(tables[0].tuples[0].values[2], "true", "Correct value in boolean column")

  })

  /* it("Schema inconsistency", () => {
    var data = `USERS::(PK:id,STR:name,BOOL:male)
    (1,\`something\`,1,)
    (2,\`something 1\`,2,)
    (3,\`something 2\`,3,)
    POSTS::(PK:id,NUM:user_id,STR:message)
    (1,3,\`something 3\`,)
    (-2,2,\`something 4\`,)
    (3,3,\`something 5\`,)`;

    expect(()=>{
      var parser = new Parser();
      parser.start(data);
    }).to.throw("invalid BOOL data on line 2");

  }) */

});
