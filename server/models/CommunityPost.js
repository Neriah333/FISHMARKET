const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  fisherman: { type: mongoose.Schema.Types.ObjectId, ref: "Fisherman", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommunityPostSchema = new mongoose.Schema({
  fisherman: { type: mongoose.Schema.Types.ObjectId, ref: "Fisherman", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [CommentSchema], // Embedded array of comments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunityPost", CommunityPostSchema);
