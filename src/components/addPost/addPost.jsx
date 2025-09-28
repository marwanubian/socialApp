"use client";
import React, { useState,useContext  } from "react";
import PostContext from "../../Context/PostContext";  // ✅ import PostContext

export default function AddPost({ onPostCreated }) {
    let{createPost}=useContext(PostContext)
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   let formData = new FormData(); // 'FormData' is case-sensitive
let body = e.target.body.value;
let image = e.target.image.files[0]; // was incorrectly using e.target.body.files

    formData.append("body",body)
    formData.append("image",image)
    let response= await createPost(formData)
    console.log(response);
onPostCreated(response.post || response);
    
    if (!body.trim()) return alert("Post content cannot be empty");

    // setLoading(true);
    // try {
    //   // Replace with your API call to create a post
    //   const formData = new FormData();
    //   formData.append("body", body);
    //   if (image) formData.append("image", image);

    //   const token = localStorage.getItem("token");
    //   const res = await fetch("https://linked-posts.routemisr.com/posts", {
    //     method: "POST",
    //     headers: { token },
    //     body: formData,
    //   });

    //   const data = await res.json();
    //   if (data?.post && onPostCreated) {
    //     onPostCreated(data.post);
    //   }

    //   setBody("");
    //   setImage(null);
    // } catch (err) {
    //   console.error("Error creating post:", err);
    //   alert("Failed to create post");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-blue-800 text-3xl my-5">Add Post</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="body"
          type="text"
          placeholder="Type Your Post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
        />
        <input
          name="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-800 text-white px-3 py-2 rounded-xl hover:bg-blue-900 transition"
        >
          {loading ? "Posting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
// "use client";
// import React, { useState, useContext } from "react";
// import PostContext from "../../Context/PostContext"; // ✅ import PostContext

// export default function AddPost({ onPostCreated }) {
//   let { createPost } = useContext(PostContext);
//   const [body, setBody] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!body.trim()) return alert("Post content cannot be empty");

//     let formData = new FormData();
//     formData.append("body", body);
//     if (image) formData.append("image", image);

//     setLoading(true);
//     try {
//       let response = await createPost(formData);
//       console.log(response);

//       if (onPostCreated) {
//         onPostCreated(response.post || response);
//       }

//       // reset form
//       setBody("");
//       setImage(null);
//     } catch (err) {
//       console.error("Error creating post:", err);
//       alert("Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-blue-800 text-3xl my-5">Add Post</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="body"
//           type="text"
//           placeholder="Type Your Post..."
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
//         />
//         <input
//           name="image"
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-800 text-white px-3 py-2 rounded-xl hover:bg-blue-900 transition"
//         >
//           {loading ? "Posting..." : "Add Post"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";
// import React, { useState, useContext } from "react";
// import PostContext from "../../Context/PostContext"; // ✅ import PostContext

// export default function AddPost({ onPostCreated }) {
//   let { createPost } = useContext(PostContext);
//   const [body, setBody] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!body.trim()) return alert("Post content cannot be empty");

//     let formData = new FormData();
//     formData.append("body", body);
//     if (image) formData.append("image", image);

//     setLoading(true);
//     try {
//       let response = await createPost(formData);
//       console.log(response);

//       if (onPostCreated) {
//         onPostCreated(response.post || response);
//       }

//       // reset form
//       setBody("");
//       setImage(null);
//     } catch (err) {
//       console.error("Error creating post:", err);
//       alert("Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-blue-800 text-3xl my-5">Add Post</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="body"
//           type="text"
//           placeholder="Type Your Post..."
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
//         />
//         <input
//           name="image"
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="input focus:outline-none w-full my-2 rounded-xl border px-3 py-2"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-800 text-white px-3 py-2 rounded-xl hover:bg-blue-900 transition"
//         >
//           {loading ? "Posting..." : "Add Post"}
//         </button>
//       </form>
//     </div>
//   );
// }
