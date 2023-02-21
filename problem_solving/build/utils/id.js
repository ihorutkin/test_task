"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const nanoid_1 = require("nanoid");
const letters = "abcdefghijklmnoqprstuvwxyz";
const nanoid = (0, nanoid_1.customAlphabet)(`1234567890${letters}${letters.toUpperCase()}`, 7);
function generateId() {
    return nanoid();
}
exports.generateId = generateId;
