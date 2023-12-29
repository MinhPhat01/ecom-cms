const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const postController = require("../controllers/post");

const validate = require("../validation/validate");
const postValidate = require("../validation/post");

router.post(
  "/posts/",
  isAuth,
  postValidate.createPost(),
  validate,
  postController.createPost
);

router.get("/posts/", isAuth, postController.getPosts);
router.get("/post/:postId", isAuth, postController.getPost);

router.patch(
  "/post/:postId",
  isAuth,
  postValidate.updatePost(),
  validate,
  postController.updatePost
);

router.delete("/post/:postId", isAuth, postController.deletePost);

module.exports = router;
