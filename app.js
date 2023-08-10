const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { createServer } = require("http");

const feedRoutes = require("./routes/feed");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

const app = express();

// File
const fileStore = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "images");
  },
  filename: (_req, file, callback) => {
    callback(null, Date.now() + "__" + file.originalname);
  },
});
function fileFilter(_req, file, callback) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

// app.use(bodyParser.urlencoded()) // default encoding x-www-form-urlencoded for <FORM>
app.use(bodyParser.json()); // application/
app.use(multer({ storage: fileStore, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", userRoutes);

// Error
app.use((error, _req, res, _next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const msg = error.message;
  const data = error.data;
  res.status(status).json({
    msg,
    data,
  });
});

// DB
mongoose
  .connect(
    "mongodb+srv://houdmohamed85:yX3YGnsZQtI7qR8W@notes.121ftjx.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    const io = require("./socket");
    const httpServer = app.listen(8080);
    io.init(httpServer);

    const socketIO = io.getIO(); // Retrieve the initialized io instance

    socketIO.on("connection", (socket) => {
      console.log("Connected to server!");
      // You can now attach other event listeners to 'socket' here
    });
  })
  .catch((err) => {
    console.log(err);
  });
