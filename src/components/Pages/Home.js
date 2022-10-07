import React from "react";
import ImageCard from "./../Shared/ImageCard";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";

const Home = () => {
  const [myimages, setMyImages] = useState([]);
  const [query, setQuery] = useState("");
  const [user] = useAuthState(auth);
  // console.log(user);

  useEffect(() => {
    if (user) {
      const { email } = user;
      let url = `https://rafath-auvee-dobby-server-production.up.railway.app/myphotos?email=${email}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMyImages(data));
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-center mt-5  text-3xl font-bold">
        My Images {myimages.length}
      </h1>

      <div className="card-actions flex justify-center items-center">
        <h1 className="text-center text-1xl mb-5 flex flex-row">
          <div className="form-control">
            <label className="label">
              <span className="label-text bg-blue-800 rounded px-5 text-white p-1">
                Search by Name 
              </span>
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by Name "
                className="input input-bordered w-Full border-3 border-black"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                min="0"
              />
            </div>
          </div>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-10">
        {query === "" ? (
          <>
            {myimages.map((image, index) => {
              return (
                <div>
                  <ImageCard key={index} images={image} />{" "}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {myimages
              .filter((asd) => asd.name.toLowerCase().includes(query))
              .map((image, index) => {
                return (
                  <div>
                    <ImageCard key={index} images={image} />
                  </div>
                );
              })}
          </>
        )}
        {/* <h1>{image.url}</h1> */}

        {/* <ImageCard
                key={index}
                images={image}
                setQuery={setQuery}
                query={query}
              /> */}

        
      </div>
    </div>
  );
};

export default Home;
