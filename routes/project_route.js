
const { authentication, restrictTo } = require("../controllers/auth_controller");
const { createProject } = require("../controllers/project_controller")
const router = require("express").Router();

router.route("/").post(authentication, restrictTo("1"), createProject);


module.exports = router