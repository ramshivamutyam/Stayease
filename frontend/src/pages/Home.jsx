import React from "react";
import image from "../assets/LandingVector.png"
import contact from "../assets/contactVector.avif"
import insta from "../assets/insta.png"
import phone from "../assets/phone.png"
import mail from "../assets/mail.png"
import { useNavigate } from "react-router-dom";
function Home() {
  const nav=useNavigate()
  return (
    <div>
      <section className="flex items-center justify-around p-8">
        <div className="w-[550px]">
          <img src={image} alt="Image" />
        </div>
        <div className="flex flex-col items-center gap-4 w-[450px]">
          <p className="font-bold text-5xl text-center text-[#1b5860]">Welcome to StayEase </p>
          <p className="font-light text-xl text-center">Find your perfect stay with our exclusive deals and seamless booking experience.</p>
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Wide Range of Accommodations</p>
            <p className="font-semibold">Best Price Guarantee</p>
            <p className="font-semibold">Easy Booking Process</p>
          </div>
          <button className="bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 text-white font-semibold px-4 py-1 rounded-xl" onClick={()=>nav('/hotels')} >Check Hotels</button>
        </div>
      </section>
      <section className="my-7 bg-[#f0f8fb] flex flex-col gap-y-6 items-center justify-center h-screen">
        <p className="font-bold text-3xl text-[#1b5860]">About Us</p>
        <p className="max-w-[600px] text-center text-sm bg-[#40A578] font-semibold p-7 rounded-xl space-x-7 shadow-md shadow-green-600 mx-3">
        <span className="font-bold text-2xl">"W</span>elcome to Stayease, your trusted destination for finding the perfect stay. Our mission is to simplify your travel planning with an extensive selection of hotels, competitive prices, and a seamless booking experience. Whether you're seeking luxury, comfort, or budget-friendly options, we cater to all your needs. With 24/7 customer support and a commitment to excellence, we ensure your satisfaction every step of the way. Join us and discover the ease of booking your ideal accommodation with confidence and convenience "
        </p>
      </section>
      <section className="flex justify-around items-center p-7 my-4">
      <div className="flex flex-col gap-7" >
          <p className="font-semibold text-5xl text-[#1b5860]">Contact Us</p>
          <p className="font-light hover:underline hover:cursor-pointer flex items-center gap-2"><img src={phone} alt="" className="w-4" /> phone</p>
          <p className="font-light hover:underline hover:cursor-pointer flex items-center gap-2"><img src={mail} alt="" className="w-4" />email</p>
          <p className="font-light hover:underline hover:cursor-pointer flex items-center gap-2"><img src={insta} alt="" className="w-4"/> instagram</p>
        </div> 
        <div className="w-[400px]">
          <img className="rounded-xl" src={contact} alt="Image" />
        </div>
      </section>
    </div>
  );
}

export default Home;
