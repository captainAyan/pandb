import {Field} from "./Field";
import {Tuple} from "./Tuple";
import {Type} from "./Type";

export class Schema {

  private _fields:Field[] = [];

  public addField(field:Field):void {
    this._fields.push(field);
  }
  
  get fields():Field[] { return this._fields; }

  /**
   * This method is used to validate whether a Tuple is consistent with
   * the given Schema.
   * 
   * @param tuple the tuple that needs to be validated
   * @param schema the reference schema for validation
   * @returns true if the tuple is consistent with the schema and vise-versa
   */
  public static validateTupleToSchema(tuple:Tuple, schema:Schema):boolean {

    if (tuple.values.length != schema.fields.length) return false;
    
    for(var i:number=0; i<tuple.values.length; i++) {
      switch(schema.fields[i].type) {
        case Type.PRIMARY_KEY: {
          let value:number = parseFloat(tuple.values[i]);
          if(isNaN(value)) return false;
          break;
        }
        case Type.NUMBER: {
          let value:number = parseFloat(tuple.values[i]);
          if(isNaN(value)) return false;
          break;
        }
        case Type.STRING: {
          let value:String = new String(tuple.values[i]);
          if (!value) return false;
          break;
        }
        case Type.BOOLEAN: {
          let value:string = tuple.values[i];
          if(!(value == "true" || value == "false")) return false;
          break;
        }
      }
    }

    return true;
  }

}