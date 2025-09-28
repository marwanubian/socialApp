"use client";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usePosts } from "../../Context/PostContext";

export default function PostCard({ post, onDelete, onUpdate, onPostCreated }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.body || post.content);
  const { deletePost } = usePosts();

  const handleImgError = (e, fallback) => {
    e.currentTarget.src = fallback;
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://linked-posts.routemisr.com/posts/${post._id}/comment`,
        { content: newComment },
        { headers: { token, "Content-Type": "application/json" } }
      );

      setComments([response.data.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      setIsDeleting(true);
      let response = await deletePost(id);
      console.log(response);
onPostCreated(response.post || response);

      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("❌ Error deleting post:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    try {
      await onUpdate(post._id, editContent);
      setEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(post.body || post.content);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      {/* Post Header with User Info and Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full border-2 border-blue-100">
              <img
                src={post.user?.photo || "/avatar.png"}
                alt="User"
                onError={(e) => handleImgError(e, "/avatar.png")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-900">{post.user?.name || "Unknown User"}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
            title="Edit post"
          >
            ✏️
          </button>
          <button
            onClick={() => handleDeletePost(post._id)}
            disabled={isDeleting}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200 disabled:opacity-50"
            title="Delete post"
          >
            {isDeleting ? "⏳" : "🗑️"}
          </button>
        </div>
      </div>

      {/* Post Content */}
      {editing ? (
        <div className="mb-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <Link to={`/postDetails/${post._id}`} className="block mb-4">
          <p className="text-gray-800 text-lg leading-relaxed">{post.body || post.content}</p>
        </Link>
      )}

      {/* Post Image */}
      {post.image && (
        <Link to={`/postDetails/${post._id}`}>
          <img
            src={post.image || "/default-post.png"}
            onError={(e) => handleImgError(e, "/default-post.png")}
            className="rounded-lg mb-4 w-full h-64 object-cover"
            alt="Post"
          />
        </Link>
      )}

      {/* Post Stats */}
      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>👍 {post.likes?.length || 0} likes</span>
        <span>💬 {comments.length} comments</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 border-t border-b border-gray-100 py-3 mb-4">
        <button className="flex-1 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200 font-medium">
          👍 Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition duration-200 font-medium"
        >
          💬 Comment
        </button>
        <button className="flex-1 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200 font-medium">
          ↪️ Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-4">
          {/* Comments List */}
          <div className="max-h-64 overflow-y-auto space-y-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        src={comment.user?.photo || "/avatar.png"}
                        alt="Commenter"
                        onError={(e) => handleImgError(e, "/avatar.png")}
                      />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900">
                      {comment.user?.name || "User"}
                    </p>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
            >
              {loading ? "..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { usePosts } from "../../Context/PostContext";
// import { useComments } from "../../Context/commentsContext";
// // import { useComments } from "../../Context/CommentsContext";

// export default function PostCard({ post, onDelete, onUpdate }) {
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [editContent, setEditContent] = useState(post.body || post.content);
//   const { deletePost } = usePosts();
//   const { getPostComments, addComment, updateComment, deleteComment } = useComments();

//   // local state for comment edit
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editCommentContent, setEditCommentContent] = useState("");

//   const handleImgError = (e, fallback) => {
//     e.currentTarget.src = fallback;
//   };

//   // ✅ load comments when comments section opens
//   useEffect(() => {
//     if (showComments) {
//       const loadComments = async () => {
//         try {
//           const res = await getPostComments(post._id);
//           setComments(res.comments || []);
//         } catch (err) {
//           console.error("❌ Failed to load comments", err);
//         }
//       };
//       loadComments();
//     }
//   }, [showComments, post._id, getPostComments]);

//   // ✅ Add comment
//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
//     try {
//       const res = await addComment(post._id, newComment); // ✅ postId + content
//       console.log("✅ Comment added:", res);
//       setNewComment(""); // تصفير المدخل بعد الإرسال
//     } catch (error) {
//       console.error("❌ Error adding comment", error);
//     }
//   };

//   // ✅ Edit comment
//   const handleSaveComment = async (commentId) => {
//     if (!editCommentContent.trim()) return;
//     try {
//       const res = await updateComment(commentId, editCommentContent);
//       setComments(
//         comments.map((c) =>
//           c._id === commentId ? { ...c, content: res.comment.content } : c
//         )
//       );
//       setEditingCommentId(null);
//       setEditCommentContent("");
//     } catch (err) {
//       console.error("❌ Error updating comment", err);
//     }
//   };

//   // ✅ Delete comment
//   const handleDeleteComment = async (commentId) => {
//     if (!window.confirm("Delete this comment?")) return;
//     try {
//       await deleteComment(commentId);
//       setComments(comments.filter((c) => c._id !== commentId));
//     } catch (err) {
//       console.error("❌ Error deleting comment", err);
//     }
//   };

//   // ✅ Delete post
//   const handleDeletePost = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     try {
//       setIsDeleting(true);
//       await deletePost(id);
//       if (onDelete) onDelete(id);
//     } catch (err) {
//       console.error("❌ Error deleting post:", err);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // ✅ Save post edit
//   const handleSaveEdit = async () => {
//     if (!editContent.trim()) {
//       alert("Post content cannot be empty");
//       return;
//     }
//     try {
//       await onUpdate(post._id, editContent);
//       setEditing(false);
//     } catch (err) {
//       console.error("❌ Error updating post:", err);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
//       {/* header */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-full border">
//             <img
//               src={post.user?.photo || "/avatar.png"}
//               alt="User"
//               onError={(e) => handleImgError(e, "/avatar.png")}
//               className="w-full h-full object-cover rounded-full"
//             />
//           </div>
//           <div>
//             <p className="font-bold">{post.user?.name || "Unknown User"}</p>
//             <p className="text-sm text-gray-500">
//               {new Date(post.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button onClick={() => setEditing(!editing)}>✏️</button>
//           <button onClick={() => handleDeletePost(post._id)} disabled={isDeleting}>
//             {isDeleting ? "⏳" : "🗑️"}
//           </button>
//         </div>
//       </div>

//       {/* body */}
//       {editing ? (
//         <div>
//           <textarea
//             value={editContent}
//             onChange={(e) => setEditContent(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           />
//           <div className="flex gap-2 mt-2">
//             <button onClick={handleSaveEdit} className="bg-green-600 text-white px-3 py-1 rounded-lg">
//               Save
//             </button>
//             <button onClick={() => setEditing(false)} className="bg-gray-300 px-3 py-1 rounded-lg">
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <Link to={`/postDetails/${post._id}`}>
//           <p>{post.body || post.content}</p>
//         </Link>
//       )}

//       {/* image */}
//       {post.image && (
//         <Link to={`/postDetails/${post._id}`}>
//           <img src={post.image} className="rounded-lg my-3 w-full h-64 object-cover" alt="Post" />
//         </Link>
//       )}

//       {/* stats */}
//       <div className="flex gap-4 text-sm text-gray-500 mb-4">
//         <span>👍 {post.likes?.length || 0} likes</span>
//         <span>💬 {comments.length} comments</span>
//       </div>

//       {/* actions */}
//       <div className="flex gap-2 border-t border-b py-2 mb-4">
//         <button className="flex-1">👍 Like</button>
//         <button onClick={() => setShowComments(!showComments)} className="flex-1">
//           💬 Comment
//         </button>
//         <button className="flex-1">↪️ Share</button>
//       </div>

//       {/* comments */}
//       {showComments && (
//         <div>
//           <div className="max-h-64 overflow-y-auto space-y-3 mb-3">
//             {comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div key={comment._id} className="flex gap-3">
//                   <div className="w-8 h-8 rounded-full overflow-hidden">
//                     <img
//                       src={comment.user?.photo || "/avatar.png"}
//                       alt="Commenter"
//                       onError={(e) => handleImgError(e, "/avatar.png")}
//                     />
//                   </div>
//                   <div className="flex-1 bg-gray-50 rounded-lg p-2">
//                     <p className="font-semibold text-sm">{comment.user?.name}</p>
//                     {editingCommentId === comment._id ? (
//                       <div>
//                         <textarea
//                           value={editCommentContent}
//                           onChange={(e) => setEditCommentContent(e.target.value)}
//                           className="w-full border rounded-lg p-2"
//                         />
//                         <div className="flex gap-2 mt-1">
//                           <button onClick={() => handleSaveComment(comment._id)} className="bg-green-500 text-white px-2 py-1 rounded-lg">Save</button>
//                           <button onClick={() => setEditingCommentId(null)} className="bg-gray-300 px-2 py-1 rounded-lg">Cancel</button>
//                         </div>
//                       </div>
//                     ) : (
//                       <p>{comment.content}</p>
//                     )}
//                     <div className="flex gap-2 text-xs mt-1">
//                       <button onClick={() => {setEditingCommentId(comment._id); setEditCommentContent(comment.content)}}>Edit</button>
//                       <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400">No comments yet.</p>
//             )}
//           </div>
//           <form onSubmit={handleAddComment} className="flex gap-2">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="flex-1 border rounded-lg px-2"
//               placeholder="Write a comment..."
//             />
//             <button disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded-lg">
//               {loading ? "..." : "Post"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
