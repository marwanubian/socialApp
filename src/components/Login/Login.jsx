import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../InputField/InputField";
import { TokenContext } from "../../Context/tokenContext";

const Login = () => {
    const { saveToken } = useContext(TokenContext);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
  console.log("Login data:", data);
  setServerError("");
  setLoading(true);
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      data,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    
    console.log("Signin success FULL response:", response.data); // 👈 اطبعي كله

    // شوفي مكان الـ token في الـ response
    const token = response.data.token || response.data.data?.token;

    if (token) {
      localStorage.setItem("token", token);
      saveToken(token);
      // saveToken(response.data.token);  // من tokenContext
    saveUser(response.data.user); 
      navigate("/"); 
    } else {
      console.error("⚠️ Token not found in response");
    }

  } catch (error) {
    console.error("Signin error:", error.response?.data || error.message);
    const msg = error.response?.data?.message || "Signin failed. Please try again.";
    setServerError(msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email address"
              type="email"
              name="email"
              placeholder="your@email.com"
              register={register}
              validation={{ required: "Email is required" }}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              register={register}
              validation={{ required: "Password is required" }}
              error={errors.password}
            />

            {serverError && (
              <p className="text-sm text-red-600 text-center">{serverError}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
