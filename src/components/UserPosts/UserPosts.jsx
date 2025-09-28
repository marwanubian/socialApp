"use client";
import React, { useState, useEffect, useContext } from "react";
import PostContext from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
// import AddPost from "../AddPost/AddPost";
import Loader from "../Loader/Loader";
import AddPost from "../addPost/addPost";

export default function UserPosts() {
  const { getProfileData, getUserPosts } = useContext(PostContext);

  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user data and posts
  const fetchUserPosts = async () => {
    try {
      setIsLoading(true);
      const profile = await getProfileData();
      setUser(profile);

      if (profile?._id) {
        const { posts } = await getUserPosts(profile._id, 50);
        setUserPosts(posts || []);
      }
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // Callback after adding a new post
  const handleNewPost = (post) => {
    setUserPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AddPost onPostCreated={handleNewPost} />
          <div className="flex justify-center items-center mt-6">
            <div className="w-full space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard onPostCreated={handleNewPost} key={post._id} post={post} />)
              ) : (
                <p className="text-center text-gray-500">No posts yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
