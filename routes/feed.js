const express = require("express");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");
const { body } = require("express-validator");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/posts", isAuth, getPosts);
router.post(
  "/post",
  [
    body("title", "Enter Valid Title").trim().isLength({ min: 5 }),
    body("content", "Enter Valid Content").trim().isLength({ min: 5 }),
  ],
  isAuth,
  createPost
);

router.get("/post/:postId", getPost);
router.put(
  "/post/:postId",
  [
    body("title", "Enter Valid Title").trim().isLength({ min: 5 }),
    body("content", "Enter Valid Content").trim().isLength({ min: 5 }),
  ],
  isAuth,
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;
