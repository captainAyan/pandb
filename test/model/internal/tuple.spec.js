const {assert} = require('chai');

const {Tuple} = require("../../../dist/model/internal/Tuple");

describe("Model.Tuple class", () => {

  it("Create a Tuple", () => {
    var first_value = "1";
    var data = new Tuple();
    data.addValue(first_value);

    assert.equal(data.values[0], first_value, "Correct first value");
  });

});