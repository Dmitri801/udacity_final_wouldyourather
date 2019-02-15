const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const questions = require("./routes/api/questions");
const db = mongoose.connection;
const PORT = 9090;
require("dotenv").config();
const app = express();

app.use(helmet());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());
require("./auth/passport.js")(passport);

// Connect Mongo

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("MongoDB Connected");
});

// Routes
app.use("/api/users", users);
app.use("/api/questions", questions);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
