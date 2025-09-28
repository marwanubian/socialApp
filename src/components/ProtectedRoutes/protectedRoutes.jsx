import React from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../../Context/tokenContext";

const ProtectedRoutes = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    // لو مفيش توكن يرجع المستخدم على صفحة login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
