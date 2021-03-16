export class RegexHelper {
  
  public static getNumberFromTupleString(data:string):string|null {
    var res:RegExpMatchArray|null = data.match(/^[+-]?[0-9]+(\.[0-9]+)?,/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return null;
  }

  public static getStringFromTupleString(data:string):string|null {

    var res:RegExpMatchArray|null = data.match(/^`(.*?)`,/);
    if(res && res.index==0) {
      var d:string = res[0].slice(1, -2);
      for(var i=0; i<d.length; i++) {
        if(d[i] == "%") {
          if(i+2 >= d.length) return null;  // since escape character codes are 2 digit alpha-numeric
          else {
            var escapeString:string = d.substr(i, 3);
            switch(escapeString) {
              case "%60": {
                d = d.substring(0, i) + "`" + d.substring(i + 1);
                d = d.slice(0, i+1) + d.slice(i+3, d.length);
                break;
              }
              case "%25": {
                d = d.substring(0, i) + "%" + d.substring(i + 1);
                d = d.slice(0, i+1) + d.slice(i+3, d.length);
                break;
              }
              default : return null;
            }
          }
        }
      }

      return d;
    }
    else return null;
  }

  public static getBooleanFromTupleString(data:string):string|null {
    var res:RegExpMatchArray|null = data.match(/^(true|false),/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return null;
  }
}