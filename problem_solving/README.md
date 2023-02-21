# Problem solving

In this repository you will find code of simple recipe application, where users can create recipes and search them.

User reports that after creating a recipe, it is not returned when searching by creation date.

Your task is to find the root cause of this issue, fix it and describe your debugging process.


# index.ts

```js

let statusCode = 200
  if(recipe?.hasOwnProperty("errorMessage")) statusCode = 422

  res.status(statusCode).send(recipe);

```

Depending on what I have in the recipe, I want to return a different status code

# requestParser

```js

import { Recipe } from "../types/recipe";

export function recipeQueryParser(query: Record<string, string>) {
  const parsedQuery: Record<string, unknown> = {};

  if (query.time) {
    parsedQuery.time = Number(query.time);
  }
  if (query.id) {
    parsedQuery.id = query.id;
  }
  if (query.authorId) {
    parsedQuery.authorId = query.authorId;
  }
  if (query.title) {
    parsedQuery.title = query.title;
  }
  if (query.createdDate) {
    parsedQuery.createdDate = query.createdDate;
  }

  return parsedQuery as Recipe;
}

```

Here the only change is that it accepts the whole query, not just time const parsedQuery: Record<string, unknown> = query;

# db.ts

```js

let sqlQuery: string
    if(sql.statements.length !== 0) {
      sqlQuery =
          "select * from " + tableName + " where " + sql.statements.join(" and ");
    } else {
      sqlQuery = "select * from " + tableName
    }

```

Because when there is no querry, he just has to take all

```js

async add(tableName: string, input: Recipe): Promise<Recipe | {errorMessage: string}>

```

I'm changing the type here

```js

{ id: generateId(), createdDate: new Date().toISOString().slice(0, 10), ...input }

```

Here a different date format, as it was in the base in this database, attached in the task

```js

if (!isEqual([ 'authorId', 'createdDate', 'id', 'time', 'title' ], sql.columns.sort())) {
    return {errorMessage: 'Invalid body keys provided. Ensure you are using {authorId: string, time: number, title:string ]'}
        }

```

Here is checking if the body is good

```js

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

```

Here I added returning what was thrown