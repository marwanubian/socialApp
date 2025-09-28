// src/Context/PostContext.jsx
import React, { createContext, useContext } from "react";
import axios from "axios";
import { useToken } from "./TokenContext"; // import token context

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const { token } = useToken(); // get token from context
  const API_URL = "https://linked-posts.routemisr.com";

  // Helper to attach token to headers
  const authHeaders = () => ({ headers: { token, "Content-Type": "application/json" } });

  

  // ⬇️ Get post by ID
  const getPostById = async (postId) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${postId}`, authHeaders());
      return data;
    } catch (error) {
      console.error("❌ Error fetching post by ID:", error);
      throw error;
    }
  };

  // ⬇️ Get all posts
  const getAllPosts = async (limit = 50) => {
    try {
      const { data } = await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit}`, authHeaders());
      console.log("🌍 [getAllPosts] response:", data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching posts:", error.response?.data || error);
      throw error;
    }
  };

  // ⬇️ Get posts by user (current user or specific user)
  const getUserPosts = async (userId, limit = 10) => {
    try {
      const { data } = await axios.get(`${API_URL}/users/${userId}/posts?limit=${limit}`, authHeaders());
      console.log(`📝 [getUserPosts] for user ${userId}:`, data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching user posts:", error.response?.data || error);
      throw error;
    }
  };
  
  // ⬇️ Get profile data
  const getProfileData = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/users/profile-data`, authHeaders());
    console.log("Profile data response:", data.user);
    return data.user; // يرجع أي شكل
  } catch (error) {
    console.error("❌ Error fetching profile data:", error);
    throw error;
  }
};

  // ⬇️ Create post
  // const createPost = async (postData) => {
  //   try {
  //     const { data } = await axios.post(`${API_URL}/posts`, postData, authHeaders());
  //     return data;
  //   } catch (error) {
  //     console.error("❌ Error creating post:", error);
  //     throw error;
  //   }
  // };

   const createPost = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token,
          "Content-Type": "multipart/form-data", // for file uploads
        },
      }
    );

    // toast.success("Post Successfully Added!");
    console.log(data, "post added");
    return data; // usually the new post data
  } catch (error) {
    console.error("Error adding post:", error);
    // toast.error("Post Failed!");
    throw error; // re-throw so the calling component can handle it
  }
};

  // ⬇️ Update post
  const updatePost = async (postId, updatedData) => {
    try {
      const { data } = await axios.put(`${API_URL}/posts/${postId}`, updatedData, authHeaders());
      return data;
    } catch (error) {
      console.error("❌ Error updating post:", error);
      throw error;
    }
  };

  // ⬇️ Delete post
  const deletePost = async (postId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/posts/${postId}`, authHeaders());
      return data;
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        getPostById,
        getUserPosts,
        getProfileData,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
