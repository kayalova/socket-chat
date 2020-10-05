import * as Koa from "koa"

const test = async (ctx: Koa.Context) => {
    await ctx.render("commonRoom")
}

const signup = async (ctx: Koa.Context) => {
    await ctx.render("signup")
}

// enter
const signin = async (ctx: Koa.Context) => {
    await ctx.render("signin")
}

const commonRoom = async (ctx: Koa.Context) => {
    await ctx.render("common room")
}

export default { test, signin, signup, commonRoom }
