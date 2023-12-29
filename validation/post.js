const { body } = require("express-validator");

exports.createPost = () => {
  return [
    body("title").trim().not().isEmpty(),
    body("banner").trim().not().isEmpty(),
    body("title").trim().not().isEmpty(),
  ];
};

exports.updatePost = () => {
  return [
    body("title").trim().not().isEmpty(),
    body("banner").trim().not().isEmpty(),
    body("title").trim().not().isEmpty(),
  ];
};
