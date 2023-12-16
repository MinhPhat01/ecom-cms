const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const postController = require("../controllers/post");

const validate = require("../validation/validate");
const createPostValidationRules = require("../validation/post");

router.post(
  "/posts/",
  isAuth,
  createPostValidationRules(),
  validate,
  postController.createPost
);

router.get("/posts/", isAuth, postController.getPosts);

module.exports = router;
