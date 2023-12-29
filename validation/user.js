const { body } = require("express-validator");

const User = require("../models/user");

const signupValidationRules = () => {
  return [
    body("username").trim().not().isEmpty().isLength({ min: 2 }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      // .custom(async (value, { req }) => {
      //   return await User.findOne({ email: value }).then((userDoc) => {
      //     if (userDoc) {
      //       return Promise.reject("E-mail address already exists!");
      //     }
      //   });
      // })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("phone_number").trim().isMobilePhone("vi-VN"),
  ];
};

module.exports = signupValidationRules;
