const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  answers: {
    type: Schema.Types.Mixed
  },
  questions: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
