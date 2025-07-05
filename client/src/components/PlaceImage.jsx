import React from "react";

export const PlaceImage = ({ place, index = 0, className=null }) => {
  if (!place.photos?.length) {
    return "";
  }
  if(!className){
    className = "w-full h-full object-cover"
  }
  return (
    <div>
      <img
        className={className}
        src={`http://localhost:4000/uploads/${place.photos[index]}`}
        alt=""
      />
    </div>
  );
};
