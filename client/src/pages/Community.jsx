import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const fishermen = [
  "Otieno Odhiambo",
  "Wanjiku Njeri",
  "Kamau Mwangi",
  "Akinyi Atieno",
  "Mutiso Muthoni",
];

export default function CommunityBlog() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("communityPosts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            author: "Otieno Odhiambo",
            title: "Morning Catch Report",
            content: "The lake was calm today, and I caught 15kg of tilapia!",
            date: new Date().toISOString(),
            likes: 2,
            comments: [
              { author: "Wanjiku Njeri", text: "Great job! How's the market today?" },
            ],
          },
        ];
  });

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [currentUser, setCurrentUser] = useState(fishermen[0]);
  const [commentInputs, setCommentInputs] = useState({});

  // Persist posts to localStorage
  useEffect(() => {
    localStorage.setItem("communityPosts", JSON.stringify(posts));
  }, [posts]);

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      author: currentUser,
      title: newPost.title,
      content: newPost.content,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  // Handle adding a comment to a post
  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, { author: currentUser, text: commentText }],
          }
        : post
    );

    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  // Handle liking a post
  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="flex h-screen bg-gray-500">
      
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Fishermen Community Blog</h1>
        <p className="text-gray-500 mb-6">
          Share your fishing stories, market updates, and cooperative announcements.
        </p>

        {/* User Selector */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Logged in as:</label>
          <select
            className="border px-2 py-1 rounded"
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          >
            {fishermen.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Create Post */}
        <Card className="p-4 mb-6 shadow bg-gray-300">
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
          <Button onClick={handleCreatePost}>Post</Button>
        </Card>

        {/* Blog Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 shadow bg-gray-300">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              <div className="text-sm text-gray-400 mt-2">
                Posted by {post.author} on {format(new Date(post.date), "PPP p")}
              </div>

              {/* Like Button */}
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => handleLikePost(post.id)}>
                  ❤️Likes({post.likes})
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mt-4 border-t pt-2">
                <h4 className="font-semibold mb-2">Comments</h4>
                {post.comments.length > 0 ? (
                  <ul className="mb-2 space-y-1">
                    {post.comments.map((c, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{c.author}:</span> {c.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mb-2">No comments yet. Be the first!</p>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                  />
                  <Button size="sm" onClick={() => handleAddComment(post.id)}>
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
