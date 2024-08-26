import React, { useContext, useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import tajimage from "../../assets/hoteltaj.jpg"
import pin from "../../assets/location.png"
import Booking from "../../components/Booking";
import { Auth } from "../../Contexts/AuthContext"
import AnchorLink from "react-anchor-link-smooth-scroll";

function HotelDetail() {
  const { hotelId } = useParams();
  const {token,role} = useContext(Auth)

  const [hotelInfo,setHotelInfo]=useState();
  

  // let hotelInfo = {
  //   name:"Sai ram residencies",
  //   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus itaque animi cumque a libero quo officiis quidem rem. Nisi quae modi alias dolore minima saepe, a reiciendis quibusdam quis. Suscipit ea voluptatibus libero voluptatem distinctio facilis assumenda? Error deleniti a aspernatur blanditiis unde. Libero sequi aspernatur quaerat deserunt deleniti velit laudantium, optio iste error perspiciatis ea consectetur voluptate laborum officia assumenda totam distinctio nihil voluptatibus nesciunt id neque! Veniam quas praesentium voluptates architecto suscipit est maxime voluptate repudiandae odio et tempora a expedita at autem eum exercitationem, vel error mollitia nam reprehenderit quibusdam delectus beatae numquam. Unde animi inventore id?",
  //   location:"Vijayawada, cross circle, beside heart",
  //   amenities:["swimming Pool", "Gym", "Pub"],
  //   manager:{
  //     fullname:"sherlie ram",
  //     email:"saisherlie@gmai.com",
  //     contact:"143143143143"
  //   }

  // }
  const getData =async ()=>{
    const r=await fetch(`http://localhost:3000/hotels/${hotelId}`)
    const data=await r.json();
    setHotelInfo(data);
    console.log(data);
  }

  useEffect(()=>{
    getData();
  },[])
  //1.hotel title card.  2.description 3.manager details
  return (
   <div className="">
    <div className="p-7 flex items-center justify-between">
      <div className="flex gap-5 p-4">
        <div className="">
          <img className="w-[250px] rounded-md" src={tajimage} alt="" />
        </div>
        <div>
          <p className="font-bold text-2xl p-3">{hotelInfo?.name}</p>
          <p className="flex gap-3 items-center"><img className="w-3 h-3" src={pin} alt="" />{hotelInfo?.location}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 p-4 bg-slate-400 rounded-xl w-fit">
        <p className="font-semibold">Warm welcome</p>
        {
          role=="user" && <AnchorLink href="#booking">
          <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-xl font-semibold">Check avalability</button>
        </AnchorLink>
        }
        
        
      </div>
    </div>
    <hr className="my-3"/>
    <div className="px-3 mx-3 my-5 flex flex-col gap-3">
      <p className="font-bold text-xl">Description : </p>
      <p>{hotelInfo?.description} </p>
      <hr className="my-3"/>
      <p className="font-bold text-xl">Amminities : </p>
      <div className="flex gap-7 items-center justify-evenly my-2">
        {hotelInfo?.amenities.map((item,ind)=>{
          return <p className="font-semibold" key={ind}>{item}</p>
        })}   
      </div>
      <hr className="my-3"/>
      <p className="font-bold text-xl">Manager Details : </p>
      <div className="flex flex-col gap-4">
        <p>Name of the manager : {hotelInfo?.manager?.fullName}</p>
        <p>E-mail : {hotelInfo?.manager?.email}</p>
        <p>Phone : {hotelInfo?.manager?.phone}</p>
      </div>
    </div>
    {role=='user' &&
    <div className="my-5" id="booking">
      <Booking hotelId={hotelId} token={token}/>
    </div>}
   </div>
  );
}

export default HotelDetail;
