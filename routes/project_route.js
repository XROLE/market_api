
const { authentication } = require("../controllers/auth_controller");
const { createProject } = require("../controllers/project_controller")
const router = require("express").Router();

router.route("/").post(authentication, createProject);


module.exports = router