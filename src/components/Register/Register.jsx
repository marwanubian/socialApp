import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField/InputField';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
const navigate = useNavigate();


  const {
    register,
    handleSubmit,setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    }
  });

  // const onSubmit = (data) => {
  //   console.log(data);
  //   // Handle form submission
  // };
  // function onSubmit(values){
  //   console.log(values);
  // }
 const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // const onSubmit = async (formData) => {
  //   setLoading(true);
  //   setServerError('');

  //   try {
  //     const { data } = await axios.post(
  //       'https://linked-posts.routemisr.com/users/signup',
  //       formData
  //     );

  //     if (data?.message === "success") {
  //       // ✅ نجاح التسجيل
  //       alert("Account created successfully!");
  //       window.location.href = "/login"; // أو navigate('/login') لو بتستخدمي react-router
  //     } else {
  //       // ❌ رجع response بس مش success
  //       setServerError(data.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     setServerError(
  //       error.response?.data?.message || "Network error, please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Watch password for confirmation validation
  
//   const onSubmit = async (formData) => {
//   console.log("FormData before submit:", formData); // ✅ شوفيه في الكونسل

//   setLoading(true);
//   setServerError("");

//   try {
//     const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", {
//   name: data.name,
//   email: data.email,
//   password: data.password,
//   rePassword: data.rePassword,
//   dateOfBirth: data.dateOfBirth,
//   gender: data.gender,
// });

   

//     if (data?.message === "success") {
//       alert("Account created successfully!");
//       window.location.href = "/login";
//     } else {
//       setServerError(data.message || "Something went wrong");
//     }
//   } catch (error) {
//     console.error("Signup error:", error);
//     setServerError(
//       error.response?.data?.message || "Network error, please try again."
//     );
//   } finally {
//     setLoading(false);
//   }
// };

  const onSubmit = async (formData) => {
  console.log("FormData before submit:", formData);

  setLoading(true);
  setServerError("");

  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      formData, // 👈 ابعتيه زي ما هو
      { headers: { "Content-Type": "application/json" } }
    );

    if (data?.message === "success") {
      alert("Account created successfully!");
navigate("/login");
    } else {
      setServerError(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Signup error:", error);
    setServerError(
      error.response?.data?.message || "Network error, please try again."
    );
  } finally {
    setLoading(false);
  }
};

  const password = watch('password');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our community today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Username"
              type="text"
              name="name"
              placeholder="Choose a username"
              register={register}  
              validation={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be less than 20 characters'
                }
              }}
              error={errors.name}
            />

            <InputField
              label="Email address"
              type="email"
              name="email"
              placeholder="your@email.com"
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              register={register}
              validation={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="rePassword"
              placeholder="••••••••"
              register={register}
              validation={{
                required: 'Please confirm your password',
                validate: value => 
                  value === password || 'Passwords do not match'
              }}
              error={errors.rePassword}
            />

            <InputField
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              register={register}
              validation={{
                required: 'Date of birth is required',
                validate: {
                  validDate: value => {
                    const selectedDate = new Date(value);
                    const minDate = new Date('1900-01-01');
                    const maxDate = new Date();
                    maxDate.setFullYear(maxDate.getFullYear() - 13); // Minimum age 13
                    
                    return (
                      (selectedDate >= minDate && selectedDate <= maxDate) || 
                      'You must be at least 13 years old'
                    );
                  }
                }
              }}
              error={errors.dateOfBirth}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", { required: 'Gender is required' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 sr-only"
                  />
                  <span className="ml-2 block text-sm text-gray-700">Male</span>
                </label>
                <label className="flex items-center justify-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", { required: 'Gender is required' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 sr-only"
                  />
                  <span className="ml-2 block text-sm text-gray-700">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <button
  type="submit"
  disabled={loading}
  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
>
  {loading ? "Registering..." : "Register"}
</button>

            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;