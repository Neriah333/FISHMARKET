import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import API from "../services/api";

export default function CommunityBlog() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch all posts from backend
  const fetchPosts = async () => {
    try {
      const res = await API.get("/community");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      alert("Failed to fetch community posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create a new post
  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      setLoading(true);
      await API.post("/community", newPost);
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Are you logged in as a fisherman?");
    } finally {
      setLoading(false);
    }
  };

  // Add a comment to a post
  const handleAddComment = async (postId) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    try {
      await API.post(`/community/${postId}/comments`, { content: commentText });
      setCommentInputs({ ...commentInputs, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    }
  };

  // Handle Like / Unlike Post
const handleLikePost = async (postId) => {
  try {
    const res = await API.post(`/community/${postId}/like`);
    setPosts((prev) =>
      prev.map((post) => (post._id === res.data._id ? res.data : post))
    );
  } catch (err) {
    console.error("Failed to like post:", err);
  }
};



  // Delete a post (admin or owner)
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/community/${postId}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Not authorized to delete this post");
    }
  };

  // Delete a comment (admin or owner)
  const handleDeleteComment = async (postId, commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`/community/${postId}/comments/${commentId}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Not authorized to delete this comment");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Fishermen Community Blog</h1>
        <p className="text-gray-500 mb-6">
          Share your fishing stories, market updates, and cooperative announcements.
        </p>

        {/* Create Post */}
        <Card className="p-4 mb-6 shadow bg-white">
          <h2 className="text-xl font-semibold mb-3">Create a New Post</h2>
          <Input
            className="mb-2"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            className="w-full border rounded p-2 mb-3 h-24"
            placeholder="Write your post..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <Button onClick={handleCreatePost} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </Card>

        {/* Blog Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post._id} className="p-4 shadow bg-white">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              <div className="text-sm text-gray-400 mt-2">
                Posted by {post.fisherman?.name || "Unknown"} on{" "}
                {format(new Date(post.createdAt), "PPP p")}
              </div>

             {/* Like Button */}
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLikePost(post._id)}
                >
                  ❤️ {post.likes?.length || 0} Likes
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeletePost(post._id)}
                >
                  🗑 Delete
                </Button>
              </div>


              {/* Comments Section */}
              <div className="mt-4 border-t pt-2">
                <h4 className="font-semibold mb-2">Comments</h4>
                {post.comments.length > 0 ? (
                  <ul className="mb-2 space-y-1">
                    {post.comments.map((c) => (
                      <li key={c._id} className="flex justify-between items-center">
                        <span>
                          <span className="font-medium">{c.fisherman?.name || "Unknown"}:</span>{" "}
                          {c.content}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteComment(post._id, c._id)}
                        >
                          ❌
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mb-2">No comments yet. Be the first!</p>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentInputs[post._id] || ""}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post._id]: e.target.value })
                    }
                  />
                  <Button size="sm" onClick={() => handleAddComment(post._id)}>
                    Comment
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-gray-400">No posts yet. Be the first to share!</p>
          )}
        </div>
      </main>
    </div>
  );
}
