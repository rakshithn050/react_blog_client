import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineLogout,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../store/user/userSlice";
import axios from "axios";

function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFilePath, setImageFilePath] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFilePath(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    setImageFileUploading(true);
    setImageFileUploadError(null);
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
        toast.error("Cannot upload this image. Please try another image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFilePath(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
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

    if (Object.keys(formData).length === 0) {
      toast.error("Nothing to change.");
      return;
    }
    if (imageFileUploading) {
      toast.warn("Please wait for some time while image is being uploaded.");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/user/update-profile/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 200) {
        dispatch(updateFailure(res.data.message));
        toast.error("Could not submit the form!! please try again later.");
      } else {
        dispatch(updateSuccess(res.data));
        toast.success("Profile Updated Successfully.");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteUserProfile = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `/api/user/delete-profile/${currentUser._id}`
      );

      if (res.status !== 200) {
        dispatch(deleteUserFailure(res.data.message));
        toast.error("Could not delete your profile!! please try again later.");
      } else {
        toast.info("Profile Deleted Successfully.");
        setTimeout(() => {
          dispatch(deleteUserSuccess(res.data));
        }, 1000);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl dark:text-white">
          Profile
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={filePickerRef}
            className="hidden"
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => {
              filePickerRef.current.click();
            }}
          >
            {imageFileUploadingProgress > 0 && (
              <CircularProgressbar
                value={imageFileUploadingProgress}
                maxValue={100}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadingProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFilePath || currentUser.profilePicture}
              alt="Profile Picture"
              className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
            />
          </div>
          <TextInput
            type="text"
            id="username"
            placeholder="Your username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            id="email"
            placeholder="Your email id"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
          />
          <Button type="Submit" gradientDuoTone="purpleToBlue" outline>
            Update Profile
          </Button>
        </form>
        <div className="text-red-500 cursor-pointer flex justify-between mt-5">
          <span
            className="flex items-center"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <HiOutlineTrash className="mr-2" /> Delete Account
          </span>
          <span className="flex items-center">
            <HiOutlineLogout className="mr-2" /> Sign Out
          </span>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-red-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure, you want to delete your account
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteUserProfile}>
              Yes!! I'm Sure
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DashboardProfile;
