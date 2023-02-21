"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const lodash_1 = require("lodash");
const sqlite3_1 = require("sqlite3");
const id_1 = require("./id");
class DB {
    db;
    constructor(filename) {
        this.db = new sqlite3_1.Database(filename);
    }
    async query(tableName, filters) {
        const sql = (0, lodash_1.reduce)(filters, (acc, value, key) => ({
            statements: [...acc.statements, key + " = $" + key],
            params: {
                ...acc.params,
                [`$${key}`]: value,
            },
        }), { statements: [], params: {} });
        let sqlQuery;
        if (sql.statements.length !== 0) {
            sqlQuery =
                "select * from " + tableName + " where " + sql.statements.join(" and ");
        }
        else {
            sqlQuery = "select * from " + tableName;
        }
        const results = new Promise((res, rej) => {
            this.db.all(sqlQuery, sql.params, (error, rows) => {
                if (error)
                    rej(error);
                else
                    res(rows);
            });
        });
        return await results;
    }
    async add(tableName, input) {
        const sql = (0, lodash_1.reduce)({ id: (0, id_1.generateId)(), createdDate: new Date().toISOString().slice(0, 10), ...input }, (acc, value, key) => ({
            columns: [...acc.columns, key],
            params: {
                ...acc.params,
                [`$${key}`]: value,
            },
        }), { columns: [], params: {} });
        if (!(0, lodash_1.isEqual)(['authorId', 'createdDate', 'id', 'time', 'title'], sql.columns.sort())) {
            return { errorMessage: 'Invalid body keys provided. Ensure you are using {authorId: string, time: number, title:string ]' };
        }
        const sqlQuery = "insert into " +
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
                }
                else {
                    const entryData = {};
                    for (const key in sql.params) {
                        if (Object.prototype.hasOwnProperty.call(sql.params, key)) {
                            const newKey = key.replace(/^\$/, ''); // remove the '$' character from the beginning of the key
                            entryData[newKey] = sql.params[key];
                        }
                    }
                    resolve(entryData);
                }
            });
        });
        return (await result);
    }
}
exports.DB = DB;
