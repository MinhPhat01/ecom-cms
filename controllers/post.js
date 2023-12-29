const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = async (req, res, next) => {
  const title = req.body.title;
  const banner = req.body.banner;
  const content = req.body.content;

  const post = new Post({
    title: title,
    banner: banner,
    content: content,
    creator: req.userId,
  });

  try {
    await post.save();

    const user = await User.findById(req.userId);
    user.posts.push(post);

    await user.save();

    res.status(201).json({
      post: post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  const page = req.query.page || 1;
  const page_size = req.query.page_size || 1;

  try {
    const count = await Post.find().countDocuments();

    const posts = await Post.find()
      // .populate("creator")
      .sort({ createAt: -1 })
      .skip((page - 1) * page_size)
      .limit(page_size);

    res.status(200).json({
      posts: posts,
      count: count,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  try {
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ post: post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    // check logged in user

    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ message: "Deleted post" });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;

  const title = req.body.title;
  const banner = req.body.banner;
  const content = req.body.content;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    post.title = title;
    post.banner = banner;
    post.content = content;

    const result = await post.save();

    res.status(200).json({ post: result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
