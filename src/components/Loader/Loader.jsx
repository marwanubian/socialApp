import React from "react";
import { GridLoader } from "react-spinners"; // ✅ استدعاء من المكتبة

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GridLoader color="#3b82f6" size={20} /> 
    </div>
  );
}
