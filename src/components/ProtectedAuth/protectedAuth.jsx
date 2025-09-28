import React from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../../Context/tokenContext";

const ProtectedAuth = ({ children }) => {
  const { token } = useToken();

  if (token) {
    // لو فيه توكن خلاص المستخدم مسجل دخول → رجعيه للصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAuth;
