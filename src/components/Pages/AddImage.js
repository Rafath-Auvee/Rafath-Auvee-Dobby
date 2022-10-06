import React, { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";

const AddImage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [addloading, setAddloading] = useState(false);

  const [user] = useAuthState(auth);
  const { email } = user;

  const imgStorageKey = "f3f22ee15d3ef328ecec838de6b26a6d";

  const BaseUrl = "http://localhost:5000/photos";
  const onSubmit = async (data) => {
    setAddloading(true);
    const image = data.image[0];
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          const product = {
            name: data.name,
            url: image,
            email: email,
          };
          fetch(`${BaseUrl}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              //console.log(inserted);
              if (inserted.acknowledged) {
                setAddloading(false);
                toast.success("Image added successfully");
                reset();
              } else {
                setAddloading(false);
                toast.error("Failed to Add");
              }
            });
        }
      });
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-center mb-5 ">Add a Photo</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo Name</span>
            </label>
            <input
              type="text"
              placeholder="Photo Name"
              className="input input-bordered w-full max-w-xs"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="input"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is Required",
                },
              })}
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </label>
            {addloading && (
              <div className="w-16 h-16 border-b-2 border-amber-900 rounded-full animate-spin mx-auto"></div>
            )}
          </div>
          <input
            className="btn w-full max-w-xs rounded bg-amber-800 border-0"
            type="submit"
            value="Add"
          />
        </form>
      </div>
    </div>
  );
};

export default AddImage;
