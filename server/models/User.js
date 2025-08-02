// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     email:{ type: String, required: true, unique: true},
//     password: { type: String, required: true },
//     role: { type: String, enum: ["developer", "admin", "agent", "fisherman"], default: "developer" }
// });

// module.exports = mongoose.model("User", userSchema);

// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String, // changed to String to allow leading 0s
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
  },
  { timestamps: true }
);

// 🔹 Hash password before saving to DB
userSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// 🔹 Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
