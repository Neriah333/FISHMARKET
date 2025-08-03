const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
