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
