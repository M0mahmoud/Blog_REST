const express = require("express");
const { body } = require("express-validator");

const {
  signup,
  login,
  getUserStatus,
  updateUserStatus,
} = require("../controllers/auth");

const User = require("../models/User");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.put(
  "/signup",
  [
    body("email", "Enter Valid Email")
      .isEmail()
      .custom(async (value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Enter Valid Password").trim().isLength({ min: 5 }),
    body("name", "Enter Valid Name").trim(),
  ],
  signup
);

router.post("/login", login);

router.get("/user/status", isAuth, getUserStatus);
router.patch(
  "/user/status",
  body("status", "Enter Valid Status").trim().not(),
  isAuth,
  updateUserStatus
);

module.exports = router;
