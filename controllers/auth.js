const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const message = require("../messages/messages");

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

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error(message.errorMessages.userNotFoundWithEmail);
      error.statusCode = 401;
      throw error;
    }

    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error(message.errorMessages.wrongPassword);
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "dummy",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
