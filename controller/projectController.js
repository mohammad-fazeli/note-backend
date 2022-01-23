const Project = require("../models/projectModel");
const Note = require("../models/noteModel");

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find({ user_id: req.user._id });
    const result = projects.map((project) => {
      return {
        name: project.name,
        _id: project._id,
      };
    });
    res.status(200).send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.addProject = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send("name required");
  }
  const newProject = new Project({
    name,
    user_id: req.user._id,
  });
  try {
    await newProject.save();
    const projects = await Project.find({ user_id: req.user._id });
    const result = projects.map((project) => {
      return {
        name: project.name,
        _id: project._id,
      };
    });
    res.status(200).send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findOneAndDelete({
      _id: id,
      user_id: req.user._id,
    });
    await Note.deleteMany({ project_id: id });
    const projects = await Project.find({ user_id: req.user._id });
    const result = projects.map((project) => {
      return {
        name: project.name,
        _id: project._id,
      };
    });
    res.status(200).send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) {
      return res.status(400).send("id required");
    }
    if (!name) {
      return res.status(400).send("name required");
    }
    await Project.findOneAndUpdate(
      {
        _id: id,
        user_id: req.user._id,
      },
      {
        $set: { name: name },
      }
    );
    const projects = await Project.find({ user_id: req.user._id });
    const result = projects.map((project) => {
      return {
        name: project.name,
        _id: project._id,
      };
    });
    res.status(200).send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};
