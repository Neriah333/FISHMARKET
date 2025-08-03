const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
  addComment,
  deleteComment,
  toggleLikePost,   // ✅ Import the missing function
} = require("../controllers/communityController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Create and read posts
router.post("/", protect, authorize(["fisherman"]), createPost);
router.get("/", protect, authorize(["fisherman", "admin", "agent"]), getAllPosts);

// Delete post (owner or admin)
router.delete("/:id", protect, authorize(["fisherman", "admin"]), deletePost);

// Add comment to post
router.post("/:id/comments", protect, authorize(["fisherman"]), addComment);

// Like/Unlike post (allow all logged-in roles)
router.post("/:id/like", protect, authorize(["fisherman", "admin", "agent"]), toggleLikePost);

// Delete comment (owner or admin)
router.delete("/:postId/comments/:commentId", protect, authorize(["fisherman", "admin"]), deleteComment);

module.exports = router;
