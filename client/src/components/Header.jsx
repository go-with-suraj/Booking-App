import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);
  const [locationModal, setLocationModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [guestsModal, setGuestsModal] = useState(false);

  const [location, setLocation] = useState("Anywhere");
  const [dates, setDates] = useState("Any week");
  const [guests, setGuests] = useState("Add guests");
  const [searchTitle, setSearchTitle] = useState("");

  const navigate = useNavigate();

  // const handleSearch = () => {
  //   // Redirect to search results page or booking page
  //   if (searchTitle.trim()) {
  //     navigate(`/search?title=${encodeURIComponent(searchTitle)}`);
  //   } else {
  //     alert("Please enter a search title.");
  //   }
  // };

  return (
    <header className="flex justify-between items-center">
      <Link to="/" className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className="font-bold text-xl">airbnb</span>
      </Link>

      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div onClick={() => setLocationModal(!locationModal)} className="cursor-pointer">
          {location}
        </div>
        <div className="border-l border-gray-300" />
        <div onClick={() => setDateModal(!dateModal)} className="cursor-pointer">
          {dates}
        </div>
        <div className="border-l border-gray-300" />
        <div onClick={() => setGuestsModal(!guestsModal)} className="cursor-pointer">
          {guests}
        </div>
        {/* <button onClick={handleSearch} className="bg-[var(--primary)] text-white p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="size-4">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 
              0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 
              10.5a8.25 8.25 0 1 1 14.59 
              5.28l4.69 4.69a.75.75 0 1 1-1.06 
              1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd" />
          </svg>
        </button> */}
      </div>

      <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 border-gray-300 rounded-full py-2 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 24 24" className="size-6">
          <path fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 
            0 0 1 0 1.5H3.75A.75.75 0 0 1 
            3 6.75ZM3 12a.75.75 0 0 1 
            .75-.75h16.5a.75.75 0 0 1 
            0 1.5H3.75A.75.75 0 0 1 3 
            12Zm0 5.25a.75.75 0 0 1 
            .75-.75h16.5a.75.75 0 0 1 
            0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd" />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="size-6 relative top-1">
            <path fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 
              0 4.5 4.5 0 0 1-9 0ZM3.751 
              20.105a8.25 8.25 0 0 1 16.498 
              0 .75.75 0 0 1-.437.695A18.683 
              18.683 0 0 1 12 22.5c-2.786 
              0-5.433-.608-7.812-1.7a.75.75 
              0 0 1-.437-.695Z"
              clipRule="evenodd" />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>

      {/* Modals */}
      {locationModal && (
        <div className="absolute top-20 bg-white shadow p-4 rounded-xl z-10">
          <input
            type="text"
            placeholder="Enter location"
            className="border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      )}
      {dateModal && (
        <div className="absolute top-20 right-64 bg-white shadow p-4 rounded-xl z-10">
          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setDates(e.target.value)}
          />
        </div>
      )}
      {guestsModal && (
        <div className="absolute top-20 right-20 bg-white shadow p-4 rounded-xl z-10">
          <input
            type="number"
            min={1}
            max={10}
            placeholder="Number of guests"
            className="border p-2 rounded"
            onChange={(e) => setGuests(e.target.value + " guests")}
          />
        </div>
      )}
    </header>
  );
};
