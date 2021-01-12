import { File } from "./File";
import { Table } from "./model/internal/Table";
import { Collection } from "./model/result/Collection";
import { Data } from "./model/result/Data";
import { Parser } from "./parser/Parser";
import { Query } from "./query/Query";

export default class Database {

  private filePath:string;
  private tables:Table[];

  public constructor(filePath:string) {
    this.filePath = filePath;

    var parser:Parser = new Parser();

    this.tables = parser.start(File.read(filePath));
  }


  public findOne(query:Query):Data {
    return new Data(); // TODO
  }

  public find(query:Query):Collection {
    return new Collection(); // TODO
  }

  public insert(data:Data):Data {
    return new Data(); //TODO
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
