import { reduce, isEqual } from "lodash";
import { Database } from "sqlite3";
import { Recipe } from "../types/recipe";
import { generateId } from "./id";

export class DB {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }

  async query<T>(tableName: string, filters: Record<string, unknown>): Promise<Array<T>> {
    const sql = reduce(
      filters,
      (acc, value, key) => ({
        statements: [...acc.statements, key + " = $" + key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { statements: [], params: {} },
    );
    let sqlQuery: string
    if(sql.statements.length !== 0) {
      sqlQuery =
          "select * from " + tableName + " where " + sql.statements.join(" and ");
    } else {
      sqlQuery = "select * from " + tableName
    }
    const results: Promise<Array<T>> = new Promise((res, rej) => {
      this.db.all(sqlQuery, sql.params, (error, rows) => {
        if (error) rej(error);
        else res(rows);
      });
    });

    return await results;
  }

  async add(tableName: string, input: Recipe): Promise<Recipe | {errorMessage: string}> {
    const sql = reduce(
      { id: generateId(), createdDate: new Date().toISOString().slice(0, 10), ...input },
      (acc, value, key) => ({
        columns: [...acc.columns, key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { columns: [], params: {} },
    );

  if (!isEqual([ 'authorId', 'createdDate', 'id', 'time', 'title' ], sql.columns.sort())) {
    return {errorMessage: 'Invalid body keys provided. Ensure you are using {authorId: string, time: number, title:string ]'}
        }

    const sqlQuery =
      "insert into " +
      tableName +
      " (" +
      sql.columns.join(", ") +
      " )" +
      "values (" +
      sql.columns.map((c) => `$${c}`).join(", ") +
      " )";
    const result = await new Promise((resolve, reject) => {
    this.db.run(sqlQuery, sql.params, (err) => {
      if (err) {
        reject(err);
      } else {
        const entryData = {};
        for (const key in sql.params) {
          if (Object.prototype.hasOwnProperty.call(sql.params, key)) {
            const newKey = key.replace(/^\$/, ''); // remove the '$' character from the beginning of the key
            entryData[newKey] = sql.params[key];
          }
        }

        resolve(entryData)}
    });
  });

    return (await result) as Recipe;
  }
}