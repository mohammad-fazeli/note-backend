const Note = require("../models/noteModel");

exports.getAllNote = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Note.find({ project_id: id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.addNewNote = async (req, res) => {
  const { title, color, project_id } = req.body;
  if (!title || !color || !project_id) {
    return res.send("title or color or project_id required");
  }
  const newNote = new Note({
    title,
    color,
    project_id,
  });
  try {
    await newNote.save();
    const notes = await Note.find({ project_id });

    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { project_id } = await Note.findOneAndDelete({ _id: id });
    const notes = await Note.find({ project_id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color } = req.body;
    if (!id) return res.status(400).send("id required");
    const { project_id } = await Note.findOneAndUpdate(
      { _id: id },
      {
        $set: { title, color },
      }
    );

    const notes = await Note.find({ project_id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.addNewTask = async (req, res) => {
  try {
    const { id, text } = req.body;
    if (!id && !text) return res.send("id and text required");
    const { project_id } = await Note.findOneAndUpdate(
      { _id: id },
      {
        $push: { tasks: { text, done: false } },
      }
    );
    const notes = await Note.find({ project_id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, text, done } = req.body;
    console.log(id, text, done);
    const { project_id } = await Note.findOneAndUpdate(
      { "tasks._id": id },
      {
        $set: { "tasks.$.text": text, "tasks.$.done": done },
      }
    );

    const notes = await Note.find({ project_id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id } = await Note.findOneAndUpdate(
      { "tasks._id": id },
      {
        $pull: { tasks: { _id: id } },
      }
    );

    const notes = await Note.find({ project_id });
    const result = notes.map((note) => {
      return {
        _id: note._id,
        title: note.title,
        color: note.color,
        tasks: note.tasks,
      };
    });
    res.send(result);
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};
