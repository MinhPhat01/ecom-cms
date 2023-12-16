const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Posts
app.use("/api/v1", postsRoutes);
// Auth
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://minhphat:280501@cluster0.m4mc5d5.mongodb.net/ecom-cms"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
