"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
const requestParsers_1 = require("./utils/requestParsers");
const app = (0, express_1.default)();
const recipeDb = new db_1.DB("indexDb");
const RECIPE_TABLE_NAME = "recipes";
app.use(express_1.default.json());
console.log("App start");
app.get("/recipes", async (req, res) => {
    const recipeQuery = (0, requestParsers_1.recipeQueryParser)(req.query);
    const recipes = await recipeDb.query(RECIPE_TABLE_NAME, recipeQuery);
    res.status(200).send(recipes);
});
app.post("/recipes", async (req, res) => {
    const recipe = await recipeDb.add(RECIPE_TABLE_NAME, req.body);
    let statusCode = 200;
    if (recipe?.hasOwnProperty("errorMessage"))
        statusCode = 422;
    res.status(statusCode).send(recipe);
});
app.listen(3000);
