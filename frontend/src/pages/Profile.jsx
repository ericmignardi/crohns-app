import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const Profile = () => {
  const { authUser, isUpdatingProfile, update } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await update({ profile_pic: base64Image });
      setSelectedImage(reader.result);
    };
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-4xl">Profile</h1>
      <div className="flex flex-col justify-center items-center border-primary border-2 rounded-lg p-4 gap-4 backdrop-blur-md">
        <label htmlFor="profile_pic">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-[var(--light)]">
              <img
                src={selectedImage || authUser.profile_pic || "/avatar.png"}
                alt={
                  authUser.first_name +
                  " " +
                  authUser.last_name +
                  "'s Profile Picture"
                }
              />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            name="profile_pic"
            className="hidden"
            id="profile_pic"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
        </label>
        <p className="text-xs text-secondary">
          {isUpdatingProfile
            ? "Uploading..."
            : "Click On The Image To Update Profile"}
        </p>
        <h2>
          <span>Full Name: </span>
          {authUser.first_name} {authUser.last_name}
        </h2>
        <p>
          <span>Username: </span>
          {authUser.username}
        </p>
        <p>
          <span>Created At: </span>
          {new Date(authUser.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
