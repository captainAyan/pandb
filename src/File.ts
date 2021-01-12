import * as fs from "fs";

/**
 * @class File class
 * 
 * File is a small API for getting file data in a JSON
 * object and saving changes. Using this class will prevent 
 * invalid formats from getting saved or loaded.
 */

export class File {

  public static read(filePath:string) {
    return fs.readFileSync(filePath).toString();
  }

}