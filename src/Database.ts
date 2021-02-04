import { File } from "./File";
import { Table } from "./model/Table";
import { Parser } from "./parser/Parser";
import { Result } from "./query/Result";
import { Query } from "./query/Query";
import { Values } from "./query/Values";

export default class Database {

  private filePath:string;
  private tables:Table[];

  public constructor(filePath:string) {
    this.filePath = filePath;
    var parser:Parser = new Parser();
    this.tables = parser.start(File.read(filePath));
  }


  public find(tableName:string, query:Query):Result {
    // TODO may return 'multiple' result (use multiple option in the query object )
    return new Result(); // TODO
  }

  public insert(tableName:string, values:Values):Result {
    // single record
    return new Result(); //TODO
  }

  public update(tableName:string, values:Values, query:Query):Result {
    // TODO may affect multiple rows (use 'multiple' option in the query object)
    return new Result();
  }

  public delete(tableName:string, query:Query):Result {
    // TODO may delete multiple rows (use 'multiple' option in query object)
    return new Result();
  }


  /**
   * any changes to the database stays on the memory. Use this method
   * to save those changes to the file.
   */
  public save():void {
    // File.save(this.fileName, this.data);
  }

  /**
   * resets the Database. All data will be lost. Call save() after calling
   * this method
   */
  public reset():void {
    // this.data = Database.reset;
  }
}
