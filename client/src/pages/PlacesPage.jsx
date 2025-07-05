import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AccountNav } from "../components/AccountNav";
import axios from "axios";
import { PlaceImage } from "../components/PlaceImage";

export const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/places/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className=" inline-flex gap-1 bg-[var(--primary)] text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              to={`/account/places/${place._id}`}
              className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
              key={index}
            >
              <div className="aspect-square w-full md:w-64 rounded-lg overflow-hidden border border-gray-300 bg-gray-200">
                {place.photos.length > 0 && (
                  <PlaceImage place={place}/>
                )}
              </div>

              <div className="flex flex-col justify-center md:flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {place.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
