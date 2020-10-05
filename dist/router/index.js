"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var controllers_1 = require("../controllers");
var router = new Router();
router.get("/", controllers_1.default.test);
exports.default = router;
