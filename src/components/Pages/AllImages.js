import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { useState, useEffect } from "react";
import ImageCard from "./../Shared/ImageCard";

const AllImages = () => {
  const [images, setImages] = useState([]);
  const [user] = useAuthState(auth);
  const { email } = user;

  useEffect(() => {
    let url = `http://localhost:5000/photos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-10">
        {images.map((image) => {
          return (
            <div>
              <ImageCard images={image} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllImages;
