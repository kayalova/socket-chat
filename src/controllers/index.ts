import * as Koa from "koa"
import db from "../db"

const signup = async (ctx: Koa.Context) => {
    await ctx.render("signup")
}

const signin = async (ctx: Koa.Context) => {
    await ctx.render("signin")
}

const commonRoom = async (ctx: Koa.Context) => {
    await ctx.render("room")

}
const postSignup = async (ctx: Koa.Context) => {
    const { name, email, password, } = ctx.request.body
    const { rows } = await db.pool.query('SELECT * FROM users WHERE email=$1', [email])
    if (rows.length) {
        ctx.body = "User with such email already registered"
        return
    }

    //hash password before
    const { rowCount } = await db.pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3)", [name, email, password])
    if (rowCount == 1) {
        ctx.redirect('/')
        ctx.body = { name }
        return

    }

    ctx.response.status = 500
    ctx.body = "Some error on server ah"
    return

}

const postSignin = async (ctx: Koa.Context) => {
    const { email, password, } = ctx.request.body
    const { rows } = await db.pool.query('SELECT * FROM users WHERE email=$1 and password=$2', [email, password])
    if (!rows.length) {
        ctx.response.status = 400
        ctx.body = "Invalid user or password"
        return
    }

    ctx.redirect('/')
    ctx.body = { email }


}


export default { signin, signup, commonRoom, postSignup, postSignin }
