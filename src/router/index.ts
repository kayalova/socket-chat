import * as Router from "koa-router"
import controllers from "../controllers"

const router = new Router()

router.get("/signup", controllers.signup)
router.get("/signin", controllers.signin)
router.get("/", controllers.commonRoom)


router.post("/signup", controllers.postSignup)
router.post("/signin", controllers.postSignin)

export default router
