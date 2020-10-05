import * as Router from "koa-router"
import controllers from "../controllers"

const router = new Router()

router.get("/", controllers.test)
router.get("/signup", controllers.signup)
router.get("/signin", controllers.signin)
router.get("/commmon", controllers.commonRoom)

export default router
