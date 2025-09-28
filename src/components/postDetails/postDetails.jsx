"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem("token");

  const handleImgError = (e, fallback) => {
    e.currentTarget.src = fallback;
  };

  // ✅ Fetch Post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://linked-posts.routemisr.com/posts/${id}`,
          {
            headers: { token },
          }
        );
        setPost(response.data.post);
        setComments(response.data.post.comments || []);
        setLikes(response.data.post.likes || []);
      } catch (err) {
        console.error("Error fetching post:", err.response?.data || err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ✅ Toggle Like
  const handleToggleLike = async () => {
    if (!token) return alert("You must be logged in to like posts.");

    try {
      setLikeLoading(true);
      const response = await axios.put(
        `https://linked-posts.routemisr.com/posts/${post._id}/like`,
        {},
        {
          headers: { token },
        }
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking post:", error.response?.data || error);
    } finally {
      setLikeLoading(false);
    }
  };

  // ✅ Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `https://linked-posts.routemisr.com/posts/${post._id}/comment`,
        { content: newComment },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      setComments([response.data.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;
  if (!post) return <p className="text-center py-6">Post not found</p>;

  const isLiked = likes.some((userId) => userId === post.user?._id);

  return (
    <div className="max-w-2xl mx-auto my-8 card bg-base-100 shadow-lg p-6">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={post.user?.photo || "/avatar.png"}
              alt="User"
              onError={(e) => handleImgError(e, "/avatar.png")}
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-lg">{post.user?.name || "Unknown User"}</p>
          <p className="text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mb-3">{post.body || post.content}</p>

      {post.image && (
        <img
          src={post.image || "/default-post.png"}
          onError={(e) => handleImgError(e, "/default-post.png")}
          className="rounded-lg mb-4 w-full"
          alt="Post"
        />
      )}

      {/* Actions */}
      <div className="flex gap-4 mb-4 text-sm text-gray-600">
        <button
          onClick={handleToggleLike}
          disabled={likeLoading}
          className={`btn btn-ghost btn-sm ${
            isLiked ? "text-blue-500" : "text-gray-500"
          }`}
        >
          👍 {likes.length}
        </button>
        <span className="btn btn-ghost btn-sm">💬 {comments.length}</span>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

      {/* Comments */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="mb-3 flex gap-3 items-start border-b pb-2"
            >
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={comment.user?.photo || "/avatar.png"}
                    alt="Commenter"
                    onError={(e) => handleImgError(e, "/avatar.png")}
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">{comment.user?.name || "User"}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No comments yet.</p>
        )}

        {/* Add Comment */}
        <form onSubmit={handleAddComment} className="flex gap-3 items-center mt-4">
          <input
            type="text"
            name="content"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
