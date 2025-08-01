const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
  addComment,
  deleteComment,
} = require("../controllers/communityController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Create and read posts
router.post("/", protect, authorize(["fisherman"]), createPost);
router.get("/", protect, authorize(["fisherman", "admin", "accountant"]), getAllPosts);

// Delete post (owner or admin)
router.delete("/:id", protect, authorize(["fisherman", "admin"]), deletePost);

// Add comment to post
router.post("/:id/comments", protect, authorize(["fisherman"]), addComment);

// Delete comment (owner or admin)
router.delete("/:postId/comments/:commentId", protect, authorize(["fisherman", "admin"]), deleteComment);

module.exports = router;
