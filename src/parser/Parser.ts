import {Field} from "../model/Field";
import {Table} from "../model/Table";
import {Schema} from "../model/Schema";
import {Tuple} from "../model/Tuple";
import {Type} from "../model/Type";
import {RegexHelper} from "./RegexHelper";

export class Parser {

  public start(file:string):Table[] {
    var lines:string[] = this.fileToLineConverter(file);

    for (const line of lines) {
      this.lineToInstructionConverter(line);
    }

    return this._tables;
  }

  private _tables:Table[] = [];
  private _lineCounter:number = 1; // for error printing

  private lineToInstructionConverter(line:string):void {
    line = line.trim();
    if(line[0] == "(") { // If the line starts with a '(' then it's a Tuple
      var tuple:Tuple = this.parseTupleString(line);
      this._tables[this._tables.length-1].addTuple(tuple);
    }
    else { // Otherwise it's a table definition 
      var table:Table = this.parseTableString(line);
      this._tables.push(table);
    }

    this._lineCounter += 1;
  }

  private parseTableString(line:string):Table {
    var tableName:string = line.split("::")[0];
    var fieldArray:string[] = line.split("::")[1].slice(1, -1).split(",")
    var schema:Schema = new Schema();

    for(const field of fieldArray) {
      schema.addField(new Field(field.split(":")[0], field.split(":")[1]));
    }

    return new Table(tableName, schema);
  }

  private parseTupleString(line:string):Tuple {
    line = line.slice(1,-1); // removing the parenthesis

    var tuple:Tuple = new Tuple();

    // this loop is going through all the fields of the last table (the current 
    // table) in the tables array
    for (var field of this._tables[this._tables.length-1].schema.fields) {
      var res:string|null = null;

      var deleteOffset:number = 1; // how many chars to remove after the actual parser result

      switch(field.type) {
        case Type.PRIMARY_KEY: {
          res = RegexHelper.getNumberFromTupleString(line);
          break;
        }
        case Type.NUMBER: {
          res = RegexHelper.getNumberFromTupleString(line);
          break;
        }
        case Type.STRING: {
          res = RegexHelper.getStringFromTupleString(line);
          deleteOffset = 3;
          break;
        }
        case Type.BOOLEAN: {
          res = RegexHelper.getBooleanFromTupleString(line);
          break;
        }
        default: break;
      }

      if(res !== null) {
        // deleting the part which has been just used.
        // Also the following comma, and in case of a string the ` and the comma (deleteOffset)
        line = line.slice(res.length+deleteOffset);
        tuple.addValue(res);
      }
      else throw {
        name: "Parser Error",
        message: `invalid ${field.type} data on line ${this._lineCounter}`
      };

    }

    return tuple;
  }

  private fileToLineConverter (file:string):string[] {
    var lines:string[] = file.split("\n");
    return lines;
  }

}