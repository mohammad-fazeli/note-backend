const express = require("express");
const User = require("../models/userModel");
const {
  addNewNote,
  deleteNote,
  getAllNote,
  updateNote,
  addNewTask,
  updateTask,
  deleteTask,
} = require("../controller/noteController");
const router = express.Router();

// get project id and return all note on project
router.get("/:id", getAllNote);

//get project id, title and add new note on project
router.post("/", addNewNote);

//get note id, text and add new task
router.post("/task", addNewTask);

//get task id and update(toggle or text)
router.put("/task", updateTask);

//get task id, note id and delete text
router.delete("/task/:id", deleteTask);

//get note id and update title or color
router.put("/:id", updateNote);

//get note id and delete note
router.delete("/:id", deleteNote);

module.exports = router;
