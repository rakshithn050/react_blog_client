import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/user/userSlice";
import OAuthButton from "../components/OAuthButton";
import { Button } from "flowbite-react";
import { IoIosArrowRoundForward } from "react-icons/io";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim(),
    }));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        dispatch(signInFailure(validationErrors));
        return;
      }
      setLoading(true);
      dispatch(signInStart());
      try {
        const response = await axios.post("/api/auth/signin", formData);

        if (response.status === 200) {
          dispatch(signInSuccess(response.data.restUserInfo));
          console.log("Form submitted successfully:", response.data);
          setFormData({
            email: "",
            password: "",
          });
          setErrors({});
          toast.success("Login successful!", {
            autoClose: 1500,
            onClose: () => navigate("/dashboard?tab=profile"),
          });
        } else {
          dispatch(signInFailure("Something went wrong"));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(signInFailure(error.message));
        toast.error("Failed to submit the form. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate, validateForm, dispatch]
  );

  return (
    <section className="m-4 lg:m-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbnVwfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Explore, Create, and Share Your Stories: Where Writers Connect
                and Ideas Flourish
              </h3>
            </div>
          </div>
        </div>
        <div className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              Sign In
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black dark:text-white transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <form
              id="login"
              method="POST"
              className="mt-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border dark:text-white border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900 dark:text-gray-300"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border dark:text-white border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    outline
                    gradientDuoTone="purpleToBlue"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {loading ? <span>Logging...</span> : <span>Login</span>}
                    {!loading && (
                      <IoIosArrowRoundForward className="w-6 h-6" /> // Increased icon size
                    )}
                  </Button>
                  {errors.submit && (
                    <p className="text-red-500 text-sm mt-1">{errors.submit}</p>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <OAuthButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
