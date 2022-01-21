const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/auth");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const find = await User.findOne({ email: req.body.email });
    if (find) {
      res.send("user is existed");
      return;
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();

    const token = signToken(user);
    res.status(200).send({
      token,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(502).send({ message: "Something is wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      res.send({
        token,
        name: user.name,
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch {
    res.status(502).send({ message: "Something is wrong" });
  }
};
