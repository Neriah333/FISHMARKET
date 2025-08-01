const CommunityPost = require("../models/CommunityPost");

// ===== Create Post =====
exports.createPost = async (req, res) => {
  try {
    const post = await CommunityPost.create({
      fisherman: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== Get All Posts with Comments =====
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate("fisherman", "name")
      .populate("comments.fisherman", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== Delete Post (Admin or Owner) =====
exports.deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.fisherman.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== Add Comment to Post =====
exports.addComment = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      fisherman: req.user.id,
      content: req.body.content,
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await CommunityPost.findById(req.params.id)
      .populate("fisherman", "name")
      .populate("comments.fisherman", "name");

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== Delete Comment (Owner or Admin) =====
exports.deleteComment = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.fisherman.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    comment.deleteOne();
    await post.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
