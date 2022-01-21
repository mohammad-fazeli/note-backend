const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  name: { type: String, required: true },
  user_id: { type: mongoose.ObjectId, required: true },
});
module.exports = Project;
