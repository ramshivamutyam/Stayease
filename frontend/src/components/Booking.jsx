
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

const Booking = (props) => {
  const nav=useNavigate();
  const [error,setError] = useState("");
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const [availRooms,setAvailRooms]=useState([]);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handleBookRoom =async (roomType)=>{
    try{
      setError("")
      const res=await fetch("http://localhost:3000/user/hotels/book",{
        method:"post",
        headers:{
          'content-type':"application/json",
          'authorization':props.token,
        },
        body:JSON.stringify({
          hotelId:props.hotelId,
          roomType:roomType,
          startDate:value.startDate,
          endDate:value.endDate
        })
      })
      if(res.ok){
        nav('/bookings')
      }
      else{
        throw new Error(await res.json().message)
      }
    }catch(err){
      setError(err.message);
    }
  }

  const handleGetAvailability =async () => {
    const r=await fetch("http://localhost:3000/user/hotels/availability",{
      method:"post",
      headers:{
        'Content-Type':"application/json",
        'authorization':props.token
      },
      body:JSON.stringify({
        hotelId:props.hotelId,
        startDate:value.startDate,
        endDate:value.endDate
      })
    })
    const data=await r.json();
    console.log(data);
    setAvailRooms(data);
    console.log(availRooms);
  }

  return (
    <div className="">
      <div className="flex flex-col items-center gap-5 my-2">
        <Datepicker
          primaryColor={"emerald"}
          minDate={new Date()}
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
        />
        <button className="bg-green-600 rounded-xl px-2 py-1 font-semibold text-green-200 hover:bg-green-400" onClick={handleGetAvailability}>
          Get Availability
        </button>
      </div>
      <div className="flex justify-evenly gap-5 flex-wrap my-8">
        {
          availRooms.map((item,ind)=>{
            return (<div key={ind} className="flex flex-col gap-2 items-center p-4 border-2 border-gray-500 rounded-xl">
          <p className="font-bold">{item.roomType}</p>
          <p>Price : {item.price}</p>
          <p>Available rooms : {item.availableRooms}</p>
          <button disabled={item.availableRooms==0?true:false} className="disabled:cursor-not-allowed disabled:text-red-500 font-semibold text-green-500 hover:underline" onClick={()=>handleBookRoom(item.roomType)}>Book Now</button>
        </div>)
          })
        }
        
      </div>
      {error && <div className="my-5 font-semibold text-red-500">{error}</div>}
    </div>
  );
};

export default Booking;
