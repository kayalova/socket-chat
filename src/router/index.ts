import * as Router from "koa-router"
import controllers from "../controllers"

const router = new Router()

router.get("/signup", controllers.getSignupPage)
router.get("/signin", controllers.getSigninPage)
router.get("/", controllers.getRoom)

router.post("/signup", controllers.signup)
router.post("/signin", controllers.signin)

router.delete("/delete", controllers.dropTable)

export default router
