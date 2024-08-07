import {
  Button,
  FileInput,
  Label,
  Spinner,
  Select,
  TextInput,
} from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { useSelector } from "react-redux";
// import Banner from "../components/Banner";

function UpdatePost() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFilePath, setImageFilePath] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const { postID } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/post/getPosts?postId=${postID}`);
        if (res.status === 200) {
          const data = res.data.posts[0];
          setFormData(data);
          setImageFilePath(data.image);
        } else {
          console.error("Failed to fetch data:", res);
          toast.error("Couldn't fetch the data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Couldn't fetch the data.");
      }
    };

    // Call getPost function only when postID changes
    getPost();
  }, [postID, currentUser._id]); // Include postID and currentUser._id in the dependency array

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setImageFile(file);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setImageFileUploadingProgress(progress.toFixed(2));
      },
      (error) => {
        setImageFileUploadError("File Size must be less than 2MB");
        setImageFileUploadingProgress(0);
        setImageFile(null);
        setImageFilePath(null);
        setImageFileUploading(false);
        setLoading(false);
        toast.error("Cannot upload this image. Please try another image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFilePath(downloadURL);
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
          setLoading(false);
          toast.success("Image Uploaded Successfully.");
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/post/updatePost/${postID}/${currentUser._id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Post updated successfully!");
        setFormData({
          title: "",
          category: "uncategorized",
          description: "",
          image: "",
        });
        setImageFile(null);
        setImageFilePath(null);
        setImageFileUploadingProgress(0);
        setTimeout(() => {
          navigate(`/post/${res.data.post.slug}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      <div className="mx-auto min-h-screen w-full px-32 mb-10">
        {/* Card */}
        {/* <Banner /> */}
        <h1 className="text-center text-3xl my-7 font-semibold dark:text-white">
          Update Post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              value={formData.title}
              onChange={handleChange}
            />
            <Select
              id="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="uncategorized">Select a Category</option>
              <option value="js">Javascript</option>
              <option value="python">Python</option>
              <option value="react">React JS</option>
              <option value="node">Node JS</option>
            </Select>
          </div>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5 h-full w-full">
                {loading ? (
                  <Spinner size="lg" />
                ) : imageFilePath ? (
                  <img
                    src={imageFilePath}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </>
                )}
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading || imageFileUploading}
              />
            </Label>
          </div>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) => {
              setFormData({ ...formData, description: value });
            }}
            className="h-72 mb-12 dark:text-white"
            required
            placeholder="Enter post description"
          />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
