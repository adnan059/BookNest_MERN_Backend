const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");
const User = require("../models/User");

// ---------- register ctrl ------------
const registerCtrl = async (req, res, next) => {
  try {
    const hashedPswd = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPswd,
    });

    const { _id, password, isAdmin, ...others } = newUser._doc;

    const token = jwt.sign({ id: _id, isAdmin: isAdmin }, process.env.SK, {
      expiresIn: "1d",
    });

    res.status(201).json({ _id, token, isAdmin, ...others });
  } catch (error) {
    next(error);
  }
};

// -------------- login --------------------

const loginCtrl = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(401, "Wrong Credentials"));
    }

    const isValidPswd = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPswd) {
      return next(createError(401, "Wrong Credentials"));
    }

    const { _id, password, isAdmin, ...others } = user._doc;

    const token = jwt.sign({ id: _id, isAdmin: isAdmin }, process.env.SK, {
      expiresIn: "1h",
    });

    res.status(200).json({ _id, token, isAdmin, ...others });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
};
