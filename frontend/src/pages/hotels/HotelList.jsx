import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel";
import bedroom from "/bedroom.jpg";
import gym from "/gym.png";
import library from "/library.jpg";
import swimmingpool from "/swimmingpool.png";
import washingmachile from "/washingmachine.png";
import movietheater from "/movietheater.jpg";
import HotelCard from "../../components/HotelCard";
import taj from "../../assets/hoteltaj.jpg"

function HotelList() {

  const [hotelData,setHotelData]=useState([])

//   const hotelData = [
//     {
//       _id:"1111",
//       imageUrls:[taj],
//       name:"Sai ram residencies",
//       location:"vijayawada,benz circle"
//     },
//     {
//       _id:"123",
//       imageUrls:[taj],
//       name:"Sai ram residencies",
//       location:"vijayawada,benz circle"
//     },
//     {
//       _id:"124",
//       imageUrls:[taj],
//       name:"Sai ram residencies",
//       location:"vijayawada,benz circle"
//     },
//     {
//       _id:"126",
//       imageUrls:[taj],
//       name:"Sai ram residencies",
//       location:"vijayawada,benz circle"
//     }
// ]
  const getData=async ()=>{
    const r=await fetch("http://localhost:3000/hotels")
    const data=await r.json();
    setHotelData(data);
  }

  useEffect(()=>{
    getData();
  },[])
 
  const bedroomPara =
    "Step into our exquisitely designed bedrooms, where luxury meets comfort in perfect harmony. Each room is thoughtfully appointed with plush bedding, modern furnishings, and a calming color palette to ensure a restful night's sleep. Whether you're here for business or leisure, our bedrooms provide a serene retreat where you can unwind and recharge in style.";

  const swimmingPara =
    "Dive into a world of relaxation and luxury at our exquisite swimming pool. Set against a backdrop of breathtaking panoramic views, our rooftop infinity pool offers the perfect escape from the hustle and bustle of city life. Whether you're looking to take a refreshing swim, lounge on our sun-kissed deck with a cocktail in hand, or enjoy a serene sunset, our pool area caters to your every desire.Experience the pinnacle of aquatic bliss at our hotel, where every moment at the pool is a moment of pure indulgence.";

  const slide3 =
    "Relax and rejuvenate at our state-of-the-art spa and wellness center, offering a range of holistic treatments.";
  const slide4 =
    "Enjoy our prime location, just steps away from the city's top attractions, shopping, and entertainment venues.";

  const slide5 =
    "Take a dip in our rooftop infinity pool, offering breathtaking panoramic views of the skyline.";
  const slides = [
    { slide: bedroomPara, img: bedroom },
    { slide: swimmingPara, img: swimmingpool },
    { slide: slide3, img: washingmachile },
    { slide: slide4, img: gym },
    { slide: slide5, img: library },
    { slide: slide5, img: movietheater },
  ];
  return (
    <>
      <div className="my-7 flex justify-center">
        <div className="w-[50%]">
          <Carousel autoSlide={true}>
            {slides.map((s,ind) => (
              <div className="h-[400px] w-full font-bold text-xl text-green-500 italic border-2  rounded-[50px] shadow-md flex justify-center place-items-center" key={ind}>
                <img
                  src={s.img}
                  className="h-full w-full fixed rounded-[50px] "
                  alt=""
                />
                <div className="z-10 w-[80%]">{s.slide}</div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="my-10 flex justify-evenly gap-6 flex-wrap">
        {
          hotelData.map((hotel)=>{
            return <HotelCard key={hotel._id} name={hotel.name} image={taj} location={hotel.location} id={hotel._id}/>
          })
        }
        
      </div>
    </>
  );
}

export default HotelList;
