import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useToken } from "../../Context/tokenContext";
import { usePosts } from "../../Context/PostContext";

const Navbar = () => {
  const { clearToken, token } = useToken();
  const { getProfileData } = usePosts();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const user = await getProfileData();
        setUserId(user._id);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, getProfileData]);

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 py-2">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-bold text-2xl">
          MySocial
        </Link>

        <div className="hidden sm:flex gap-6">
          <Link to="/">Home</Link>

          {!token && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}

          {token && loading && <span>Loading...</span>}

          {token && userId && (
            <>
              <Link to={`/userPosts/${userId}`}>User Posts</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {token && (
            <div className="relative">
              <FaBell className="text-gray-600 text-xl cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
          )}
          <Link to="/profile">
            <FaUserCircle className="text-blue-600 text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
