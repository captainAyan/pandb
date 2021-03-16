import {Schema} from "./Schema";
import {Tuple} from "./Tuple";

export class Table {

  private _name:string;
  private _schema:Schema;
  private _tuples:Tuple[];

  constructor(name:string, schema:Schema) {
    if (name == "") throw {
      name: "Parser Error",
      message: `table name cannot be empty`
    };
    else this._name = name;
    this._schema = schema;
    this._tuples = [];
  }

  public addTuple(tuple:Tuple):void {
    if(Schema.validateTupleToSchema(tuple, this._schema)) this._tuples.push(tuple);
    else throw {
      name: "Parser Error",
      message: "tuple does not match with table schema"
    };
  }

  get name():string { return this._name; }
  get tuples():Tuple[] { return this._tuples; }
  get schema():Schema { return this._schema; }

}