import * as Koa from "koa"
import { stringify } from "querystring"
import * as db from "../db"
import { User } from "../models/User"
import * as utils from "../utils"

const getSignupPage = async (ctx: Koa.Context) => ctx.render("signup")
const getSigninPage = async (ctx: Koa.Context) => ctx.render("signin")
const getRoom = async (ctx: Koa.Context) => ctx.render("room")

const dropTable = async (ctx: Koa.Context) => {
  const conn = await db.openConnection()
  const repo = conn.getRepository(User)
  await repo.delete({})
  await conn.close()
}

const signup = async (ctx: Koa.Context) => {
  const { name, email, password } = ctx.request.body
  const connection = await db.openConnection()
  const repository = connection.getRepository(User)
  const [_, count] = await repository.findAndCount({ email })
  if (count) {
    ctx.body = "User with such email already registered"
    connection.close()
    return
  }
  const hashedPassword =  utils.hashPassword(password)
  const newUser = new User(name, email, hashedPassword)
  await repository.save(newUser)
  connection.close()
  ctx.redirect("/")
  ctx.body = { name }
  return
}

const signin = async (ctx: Koa.Context) => {
  const { email, password } = ctx.request.body
  const hashedPassword: string = utils.hashPassword(password)
  const connection = await db.openConnection()
  const repository = connection.getRepository(User)

  const user = await repository.findOne({ email, password: hashedPassword })
  await connection.close()

  if (!user) {
    ctx.response.status = 400
    ctx.body = "Invalid email or password"
    return
  }
  ctx.redirect("/")
  ctx.body = { name: user.name }
}

export default {
  getSigninPage,
  getSignupPage,
  getRoom,
  signup,
  signin,
  dropTable,
}
