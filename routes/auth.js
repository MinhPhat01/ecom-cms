const express = require("express");
const { body } = require("express-validator");

const userAuth = require("../validation/user");
const validate = require("../validation/validate");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  userAuth.signupValidationRules(),
  validate,
  authController.signup
);

module.exports = router;
