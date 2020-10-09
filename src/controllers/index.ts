import * as Koa from "koa"
import * as db from "../db"
import { User } from '../models/User'

const getSignupPage = async (ctx: Koa.Context) => ctx.render("signup")
const getSigninPage = async (ctx: Koa.Context) => ctx.render("signin")
const getRoom = async (ctx: Koa.Context) => ctx.render("room")

const signup = async (ctx: Koa.Context) => {
    const { name, email, password, } = ctx.request.body
    const connection = await db.openConnection()
    const repository = connection.getRepository(User)
    const [_, count] = await repository.findAndCount({ email })
    if (count) {
        ctx.body = "User with such email already registered"
        connection.close()
        return
    }
    // TODO: hash password
    const newUser = new User(name, email, password)
    await repository.save(newUser)
    connection.close()
    ctx.redirect('/')
    ctx.body = { name }
    return

}

const signin = async (ctx: Koa.Context) => {
    const { email, password, } = ctx.request.body
    //TODO: hash password
    const connection = await db.openConnection()
    const repository = connection.getRepository(User)
    const user = await repository.findOne({ email, password })
    await connection.close()
    if (!user) {
        ctx.response.status = 400
        ctx.body = "Invalid user or password"
        return
    }
    ctx.redirect('/')
    ctx.body = { name: user.name }
}


export default { getSigninPage, getSignupPage, getRoom, signup, signin }
