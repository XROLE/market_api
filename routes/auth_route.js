const { signUp } = require("../controllers/auth_controller");

const router = require("express").Router();


router.route("/signup").post(signUp)


module.exports = router