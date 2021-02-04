export class Tuple {

  private _values:string[] = [];

  public addValue(val:string):void {
    this._values.push(val);
  }
  
  get values():string[] { return this._values; }

}