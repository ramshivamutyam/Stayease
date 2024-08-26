/* eslint-disable react/prop-types */
import React from "react";
import pin from "../assets/location.png";
import { useNavigate } from "react-router-dom";

function HotelCard(props) {
  const navigate = useNavigate();
  function handleClick(e, hotelId) {
    e.preventDefault();
    navigate(`/hoteldetail/${hotelId}`);
  }
  return (
    <div
      className="flex gap-5 p-4 bg-slate-200 rounded-md shadow-md shadow-gray-400 hover:bg-green-200  hover:cursor-pointer "
      onClick={(e) => handleClick(e, props.id)}
    >
      <div className="">
        <img className="w-[250px] rounded-md" src={props.image} alt="" />
      </div>
      <div>
        <p className="font-bold text-2xl p-3">{props.name}</p>
        <div className="flex gap-3 items-center">
          <img className="w-3 h-3" src={pin} alt="" />
          <p className="text-wrap">{props.location}</p>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
