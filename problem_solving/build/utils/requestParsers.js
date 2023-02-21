"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeQueryParser = void 0;
function recipeQueryParser(query) {
    const parsedQuery = {};
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
    return parsedQuery;
}
exports.recipeQueryParser = recipeQueryParser;
