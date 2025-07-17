const mongoose = require("mongoose");

const fishermanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactInfo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Fisherman", fishermanSchema);
