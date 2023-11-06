const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone_number = req.body.phone_number;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      username: username,
      email: email,
      password: hashedPw,
      phone_number: phone_number,
    });
    const result = await user.save();

    res.status(201).json({
      userId: result._id,
      username: result.username,
      email: result.email,
      phone_number: result.phone_number,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
