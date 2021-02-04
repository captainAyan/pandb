
export class Values {
  private _data:string[] = [];
  
  public addValue(val:string):void {
    this._data.push(val);
  }
    
  get values():string[] { return this._data; }
}