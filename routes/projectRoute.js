const express = require("express");
const {
  getAll,
  addProject,
  deleteProject,
  updateProject,
} = require("../controller/projectController");

const router = express.Router();

//get all project
router.get("/", getAll);

//get name and add new project and return all project
router.post("/", addProject);

//get project id and delete project
router.delete("/:id", deleteProject);

//get project id and new name and update name project and return all project
router.put("/:id", updateProject);

module.exports = router;
