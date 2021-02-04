import {Type} from "./Type";

export class Field {

  private static readonly validTypes:string[] = [
    Type.PRIMARY_KEY, Type.NUMBER, Type.STRING, Type.BOOLEAN];
  
  private _type:string;
  private _name:string;

  constructor(type:string, name:string) {
    if(Field.validTypes.includes(type)) {
      this._type = type;
      this._name = name;
    }
    else throw new Error("Invalid field type")
  }

  get type():string { return this._type; }
  get name():string { return this._name; }
}