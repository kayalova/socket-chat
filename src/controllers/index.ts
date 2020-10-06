import * as Koa from "koa"

const signup = async (ctx: Koa.Context) => {
    await ctx.render("signup")
}

// enter
const signin = async (ctx: Koa.Context) => {
    await ctx.render("signin")
}

const commonRoom = async (ctx: Koa.Context) => {
    await ctx.render("room")
}

export default { signin, signup, commonRoom }
