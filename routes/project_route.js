
const { authentication, restrictTo } = require("../controllers/auth_controller");
const { createProject, getProjectById, updateProject } = require("../controllers/project_controller")
const router = require("express").Router();

router
.route("/")
.post(authentication, restrictTo("1"), createProject)
.get(authentication, createProject);

router
.route("/:id")
.get(authentication, getProjectById)
.patch(authentication, updateProject);


module.exports = router