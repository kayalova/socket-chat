import * as Koa from "koa"
import { UserService } from '../services/UserService'
import * as db from "../db"
import { User } from "../models/User"
import { ResponseError } from '../models/ResponseError'
import * as utils from "../utils"

const getSignupPage = async (ctx: Koa.Context) => ctx.render("signup")
const getSigninPage = async (ctx: Koa.Context) => ctx.render("signin")
const getRoom = async (ctx: Koa.Context) => {
	console.log('hello')
	const name = ctx.request.body.name || "Anonymous"
	return ctx.render("room")
}

const dropTable = async (ctx: Koa.Context) => {
	const conn = await db.openConnection()
	const repo = conn.getRepository(User)
	await repo.delete({})
	await conn.close()
}

const signup = async (ctx: Koa.Context) => {
	const { name, email, password } = ctx.request.body

	const isExists = await UserService.isExists(email)
	if (isExists) return new ResponseError("User with such email already registered", 400)


	await UserService.create(name, email, password)

	ctx.body = { name }
	ctx.status = 201
}

const signin = async (ctx: Koa.Context) => {
	const { email, password } = ctx.request.body

	const user = await UserService.find(email, password)
	if (!user) return new ResponseError("Invalid email or password", 400)

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
