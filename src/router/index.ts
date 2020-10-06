import * as Router from "koa-router"
import controllers from "../controllers"

const router = new Router()

router.get("/signup", controllers.signup)
router.get("/signin", controllers.signin)
router.get("/", controllers.commonRoom)

export default router
