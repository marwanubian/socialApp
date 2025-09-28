// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PostCard from "../PostCard/PostCard";
// import Loader from "../Loader/Loader";
// import AddPost from "../addPost/addPost";
// // import AddPost from "../AddPost/AddPost"; // ✅ Import AddPost

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("No token found in localStorage");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           "https://linked-posts.routemisr.com/posts?limit=50",
//           {
//             headers: {
//               token,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         setPosts(response.data.posts || []);
//       } catch (error) {
//         console.error("Error fetching posts:", error.response?.data || error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // ✅ Handle adding new post
//   const handleNewPost = (post) => {
//     setPosts((prev) => [post, ...prev]);
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>

//       {/* AddPost Component */}
//       <div className="mb-8">
//         <AddPost onPostCreated={handleNewPost} />
//       </div>

//       {loading ? (
//         <Loader />
//       ) : posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         posts.map((post) => <PostCard key={post._id} post={post} />)
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { usePosts } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../addPost/addPost";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getAllPosts } = usePosts(); // ✅ من الكونتكست

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(50); // ✅ استدعاء API
        setPosts(data.posts || []);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [getAllPosts]);

  // ✅ Handle adding new post
  const handleNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>

      {/* AddPost Component */}
      <div className="mb-8">
        <AddPost onPostCreated={handleNewPost} />
      </div>

      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
