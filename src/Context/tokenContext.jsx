import React, { createContext, useState, useEffect, useContext } from "react";

// إنشاء الكونتكست
export const TokenContext = createContext();
export const useToken = () => useContext(TokenContext);


export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // تحميل التوكن من localStorage عند أول تشغيل
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // تحديث التوكن في state + localStorage
  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};
