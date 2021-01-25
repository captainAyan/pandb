export class RegexHelper {
  
  public static getNumberFromTupleString(data:string):string {
    var res:RegExpMatchArray|null = data.match(/^[+-]?[0-9]+(\.[0-9]+)?,/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return "";
  }

  public static getStringFromTupleString(data:string):string { // rewrite this without regex and implement escape string
    // data.match(/^`(.*?)`,/); 
    // TODO or I can use this one /^`(?:[^`\\]|\\.)*`,/

    /* TODO 💡 New Idea : Use the URL escape character for ` (%60) and 
    the character for % (%25). The best part about url escape characters is
    that you're supposed to read the two consecutive two characters after the 
    percentage sign.
    */

    var res:RegExpMatchArray|null = data.match(/^`(.*?)`,/);
    // the ` signs are necessary because otherwise string true/false 
    // will be indistinguishable from the boolean ones
    if(res && res.index==0) {
      //return '`'+res[0].slice(1,-2)+'`';
      var d:string = res[0].slice(1, -2);
      for(var i=0; i<d.length; i++) {
        if(d[i] == "%") {
          if(i+2 >= d.length) return "";  // since escape character codes are 2 digit alpha-numeric
          else {
            var escape_string:string = d.substr(i, 3);
            switch(escape_string) {
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
              default : return "";
            }
          }
        }
      }

      return '`'+d+'`';
    }
    else return "";
  }

  public static getBooleanFromTupleString(data:string):string {
    var res:RegExpMatchArray|null = data.match(/^(true|false),/);
    if(res && res.index==0) return res[0].slice(0,-1);
    else return "";
  }
}