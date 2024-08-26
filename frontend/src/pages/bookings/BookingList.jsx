import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../../Contexts/AuthContext";

function BookingList() {
  const { token, role } = useContext(Auth);
  const [bookings, setBookings] = useState([]);
  const getBookings = async () => {
    const r = await fetch(`http://localhost:3000/${role}/bookings`, {
      headers: {
        authorization: token,
      },
    });
    const data = await r.json();
    setBookings(data);
  };

  const handleCancel =async (id)=>{
    const res=await fetch(`http://localhost:3000/${role}/bookings/cancel`, {
      method:"post",
      headers: {
        "Content-Type":"application/json",
        "authorization": token,
      },
      body:JSON.stringify({bookingId:id})
    });
    if(res.ok)
      getBookings();
  }

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <div className='text-center font-bold text-2xl my-4'>Bookings</div>
      <hr className='border-red-500 border-1'/>
      {bookings.length==0 && 
        <div className="font-bold text-center text-4xl font-sans">No Current Bookings</div>
      }
      {bookings && bookings.map((item, ind) => {
        return (
          <div key={ind} className="flex justify-around p-4 border-2 border-gray-400 mx-2 my-4 rounded-xl">
            <div>
              <p>Customer Name : {item.user.fullName}</p>
              <p>Hotel Name : {item.hotel.name}</p>
            </div>
            <div>
              <p>
                {new Date(item.startDate).toDateString()} -
                {new Date(item.endDate).toDateString()}
              </p>
              <p className="flex justify-between items-center">
                Status : {item.status}
                {item.status == "confirmed" && (
                  <button className="font-semibold text-red-600 hover:underline" onClick={()=>handleCancel(item._id)}>
                    Cancel
                  </button>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingList;
