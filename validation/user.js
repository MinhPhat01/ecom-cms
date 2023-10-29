const { body } = require("express-validator");

exports.signupValidationRules = () => {
  return [
    body("username").trim().not().isEmpty().isLength({ min: 2 }),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
    body("phone_number").trim().isNumeric(),
  ];
};
