import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import app from "../firebase";
import axios from "axios";
import { signInFailure, signInSuccess } from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OAuthButton() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAuthClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const response = await axios.post("/api/auth/google_auth", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoURL: resultsFromGoogle.user.photoURL,
      });
      if (response.status == 200) {
        dispatch(signInSuccess(response.data.restUserInfo));
        toast.success("Login successful!", {
          autoClose: 1500,
          onClose: () => navigate("/dashboard"),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 px-3.5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-black dark:focus:text-white focus:outline-none"
      onClick={handleOAuthClick}
    >
      <span className="mr-2 inline-block">
        <svg
          className="h-6 w-6 text-rose-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
        </svg>
      </span>
      Sign in with Google
    </button>
  );
}

export default OAuthButton;
