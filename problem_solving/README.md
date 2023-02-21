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

W zaleznosci od tego co mam w recipe chce zwrócić inny status code

# requestParser

```js

import { Recipe } from "../types/recipe";

export function recipeQueryParser(query: Record<string, string>) {
  const parsedQuery: Record<string, unknown> = query;

  if (query.time) {
    parsedQuery.time = Number(query.time);
  }

  return parsedQuery as Recipe;
}

```

Tutaj zmiana tylko tego, żeby przyjmowało całe querry, a nie tylko time const parsedQuery: Record<string, unknown> = query;

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

Po to, że gdy nie ma querry to po prost ma wziąć all

```js

async add(tableName: string, input: Recipe): Promise<Recipe | {errorMessage: string}>

```

Zmieniam typ tutaj

```js

{ id: generateId(), createdDate: new Date().toISOString().slice(0, 10), ...input }

```

tutaj inny format daty, taki jak był bazowo w tej bazie danych, dołączonej w zadaniu

```js

if (!isEqual([ 'authorId', 'createdDate', 'id', 'time', 'title' ], sql.columns.sort())) {
    return {errorMessage: 'Invalid body keys provided. Ensure you are using {authorId: string, time: number, title:string ]'}
        }

```

Tutaj sprawdzanie czy dobre body

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

tutaj dodałem zwracanie tego co zostało wrzucone