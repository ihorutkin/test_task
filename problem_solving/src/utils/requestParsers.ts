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