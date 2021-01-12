export class RegexHelper {
  
  public static getNumberFromTupleString(data:string):string {
    var res:RegExpMatchArray|null = data.match(/^[+-]?[0-9]+(\.[0-9]+)?,/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return "";
  }

  public static getStringFromTupleString(data:string):string {
    var res:RegExpMatchArray|null = data.match(/^`(.*?)`,/); // TODO or I can use this one ^"(?:[^"\\]|\\.)*",
    // the ` signs are necessary because otherwise string true/false 
    // will be indistinguishable from the boolean ones
    if(res && res.index==0) return '`'+res[0].slice(1,-2)+'`';
    else return "";
  }

  public static getBooleanFromTupleString(data:string):string {
    var res:RegExpMatchArray|null = data.match(/^(true|false),/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return "";
  }
}