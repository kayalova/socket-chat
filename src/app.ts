import * as Koa from "koa"
import * as render from "koa-ejs"
import * as logger from "koa-logger"
import * as serve from "koa-static"
import bodyParser from "koa-bodyparser-ts"
import * as path from "path"
import * as socketIO from "socket.io"
import * as http from "http"
import * as settings from "./settings"
import router from "./router"

settings.envconf()

const app: Koa = new Koa()

const server = http.createServer(app.callback())
const io = socketIO(server)

io.on("connection", (socket) => {
    socket.on("newMsg", (msg) => {
        console.log("got new message: ", msg)
        io.emit("addMsg", { msg, user: "u know" })
    })
})

render(app, {
    root: path.join(__dirname, "views"),
    layout: "layout",
    viewExt: "html",
    cache: false,
    debug: false,
})


app.use(serve(path.join(__dirname, "public")))
app.use(bodyParser())
app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())
server.listen(Number(process.env.PORT), () => console.log("server started!"))
