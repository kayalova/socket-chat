"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var settings_1 = require("./settings");
var router_1 = require("./router");
settings_1.default.envconf();
var app = new Koa();
app.use(router_1.default.routes());
app.use(router_1.default.allowedMethods());
console.log(process.env.PORT);
// app.listen(Number(process.env.PORT), () => console.log("server started"))
