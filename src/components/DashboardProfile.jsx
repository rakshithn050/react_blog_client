import { Button, TextInput } from "flowbite-react";
import React from "react";
import { HiOutlineLogout, HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";

function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl dark:text-white">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="Profile Picture"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Your username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="Your email id"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="********" />
        <Button type="Submit" gradientDuoTone="purpleToBlue" outline>
          Update Profile
        </Button>
      </form>
      <div className="text-red-500 cursor-pointer flex justify-between mt-5">
        <span className="flex items-center">
          <HiOutlineTrash className="mr-2" /> Delete Account
        </span>
        <span className="flex items-center">
          <HiOutlineLogout className="mr-2" /> Sign Out
        </span>
      </div>
    </div>
  );
}

export default DashboardProfile;
