"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var path = require("path");
function envconf() {
    dotenv.config({ path: path.join(__dirname, "..", ".env") });
}
exports.default = { envconf: envconf };
