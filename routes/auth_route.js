const { signUp, login } = require("../controllers/auth_controller");
const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router