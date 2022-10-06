import React from "react";

const ImageCard = ({ setImages, images }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full">
        <a href="#!">
          <img className="rounded-t-lg h-[350px] w-full" src={images.url} alt="" />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-lg font-medium mb-2">
            {images.name.length > 50 ? (
              <span>{images.name.slice(0, 50)}....</span>
            ) : (
              images.name
            )}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
