// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     email:{ type: String, required: true, unique: true},
//     password: { type: String, required: true },
//     role: { type: String, enum: ["developer", "admin", "agent", "fisherman"], default: "developer" }
// });

// module.exports = mongoose.model("User", userSchema);

// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["fisherman", "admin", "agent"],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
