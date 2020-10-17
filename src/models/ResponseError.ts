import { Context } from 'koa'

export class ResponseError {
    public message: string
    public statusCode: number

    constructor(message: string, statusCode: number) {
        this.message = message
        this.statusCode = statusCode
    }

    send(ctx: Context) {
        ctx.body = { message: this.message }
        ctx.staus = this.statusCode
    }
}