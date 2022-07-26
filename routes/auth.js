const { register, login } = require("./../controllers/auth")
const { checkUser } = require("./../middlewares/authMiddlewares")

const router = require("express").Router()

router.post("/", checkUser) 
router.post("/signup", register)
router.post("/login", login)

module.exports = router