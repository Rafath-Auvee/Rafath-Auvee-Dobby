import React from "react";
import ImageCard from "./../Shared/ImageCard";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";

const Home = () => {
  const [myimages, setMyImages] = useState([]);
  const [user] = useAuthState(auth);
  const { email } = user;

  useEffect(() => {
    let url = `http://localhost:5000/myphotos?email=${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMyImages(data));
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5 text-3xl font-bold">
        My Images {myimages.length}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-10">
        {myimages.map((image, index) => {
          return (
            <div>
              {/* <h1>{image.url}</h1> */}
              <ImageCard key={index} images={image} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
