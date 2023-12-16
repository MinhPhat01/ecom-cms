const express = require("express");

const signupValidationRules = require("../validation/user");
const validate = require("../validation/validate");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  signupValidationRules(),
  validate,
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
