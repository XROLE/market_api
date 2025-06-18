
const { createProject } = require("../controllers/project_controller")
const router = require("express").Router();

router.route("/").post(createProject);


module.exports = router