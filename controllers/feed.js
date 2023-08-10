const path = require("path");
const fs = require("fs");

const { validationResult } = require("express-validator");
const io = require("../socket");
const Post = require("../models/Post");
const User = require("../models/User");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 4;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      posts,
      totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      msg: "Success Fetch post",
      post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;
  let creator;
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enter a valid Data");
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error("No Image provided");
    error.statusCode = 422;
    throw error;
  }

  const image = req.file.path.replace("\\", "/");
  try {
    const post = new Post({
      title: title,
      content,
      creator: req.userId,
      image,
    });
    await post.save();
    const user = await User.findById(req.userId);

    creator = user;
    user.posts.push(post);

    await user.save();

    io.getIO().emit("posts", {
      action: "create",
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } },
    });
    return res.status(201).json({
      msg: "Post successfully Created",
      post: post,
      creator: { _id: creator._id, name: creator.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enter a valid Data");
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req.body;
  let { image } = req.body;
  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }
  if (!image) {
    const error = new Error("No image specified");
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("Could not find post!");
      error.statusCode = 404;
      throw error;
    }
    if (String(post.creator._id) !== req.userId) {
      const error = new Error("Not Authorized");
      error.statusCode = 404;
      throw error;
    }
    if (image !== post.image) {
      clearImage(post.image);
    }
    post.title = title;
    post.content = content;
    post.image = image;
    await post.save();
    io.getIO().emit("posts", {
      action: "update",
      post,
    });
    res.status(200).json({ msg: "Post Update Scessfully", post });
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

    // Check Login status
    if (!post) {
      const error = new Error("Could not find post!");
      error.statusCode = 404;
      throw error;
    }
    if (String(post.creator) !== req.userId) {
      const error = new Error("Not Authorized");
      error.statusCode = 404;
      throw error;
    }
    clearImage(post.image);
    await Post.findByIdAndDelete(postId);

    const user = await User.findById(req.userId);
    // Clear Post from User Object In DB
    user.posts.pull(postId); // Clear Posts Relations
    await user.save();

    io.getIO().emit("posts", {
      action: "delete",
      post: postId,
    });
    return res.status(200).json({ msg: "Delete Success" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
