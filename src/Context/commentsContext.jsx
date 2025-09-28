// src/Context/commentsContext.jsx
import React, { createContext, useContext } from "react";
import axios from "axios";
import { useToken } from "./tokenContext";

const API_URL = "https://linked-posts.routemisr.com";

export const CommentsContext = createContext();
export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
  const { token } = useToken();

  // ✅ إعداد الهيدر مع التوكن
  const authHeaders = () => ({
    headers: {
      token, // السيرفر بتاعك بيطلب "token" مش "Authorization"
      "Content-Type": "application/json",
    },
  });

  // ✅ إضافة تعليق
  const addComment = async (postId, content) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/posts/${postId}/comments`,
        { content },
        authHeaders()
      );
      console.log("➕ [addComment]:", data);
      return data;
    } catch (error) {
      console.error("❌ Error adding comment:", error.response?.data || error);
      throw error;
    }
  };

  // ✅ جلب التعليقات
  const getComments = async (postId) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/posts/${postId}/comments`,
        authHeaders()
      );
      return data;
    } catch (error) {
      console.error("❌ Error fetching comments:", error.response?.data || error);
      throw error;
    }
  };

  // ✅ تحديث تعليق
  const updateComment = async (commentId, content) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/comments/${commentId}`,
        { content },
        authHeaders()
      );
      console.log("✏️ [updateComment]:", data);
      return data;
    } catch (error) {
      console.error("❌ Error updating comment:", error.response?.data || error);
      throw error;
    }
  };

  // ✅ حذف تعليق
  const deleteComment = async (commentId) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/comments/${commentId}`,
        authHeaders()
      );
      console.log("🗑️ [deleteComment]:", data);
      return data;
    } catch (error) {
      console.error("❌ Error deleting comment:", error.response?.data || error);
      throw error;
    }
  };

  return (
    <CommentsContext.Provider
      value={{ addComment, getComments, updateComment, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
