const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, required: true },
});

const Note = mongoose.model("Note", {
  title: { type: String, required: true },
  color: { type: String, required: true },
  tasks: { type: [taskSchema], required: true },
  texts: { type: [textSchema], required: true },
  project_id: { type: mongoose.ObjectId, required: true },
});

module.exports = Note;
