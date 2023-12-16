const { body } = require("express-validator");

const createPostValidationRules = () => {
  return [
    body("title").trim().not().isEmpty(),
    body("banner").trim().not().isEmpty(),
    body("title").trim().not().isEmpty(),
  ];
};

module.exports = createPostValidationRules;
