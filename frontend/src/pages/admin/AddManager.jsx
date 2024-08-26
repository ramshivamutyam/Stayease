
import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png"
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Contexts/AuthContext";

function AddManager() {
  const nav=useNavigate()
  const {token,role}=useContext(Auth)
  useEffect(()=>{
    if(!token || role!="admin")
      nav('/');
  })
  const initial = {
    fullname: "",
    email: "",
    phone: "",
    hotelName:"",
    password: "",
  };
  const [info, setInfo] = useState(initial);
  const [error,setError]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  function handleChange(e) {
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    try{
      setIsLoading(true);
      if(!info.email || !info.fullname || !info.hotelName || !info.password || !info.phone) throw new Error("All credentials required");
      const res=await fetch("http://localhost:3000/users/addManager",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authorization":token
        },
        body:JSON.stringify(info)
      })
      if(!res.ok){
        let r=await res.json()
        setError(r.message);
      }else{
        setInfo(initial)
      }
    }catch(err){
      setError(err.message)
      console.log("Error : "+err.message);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <form
        className="w-fit h-fit px-6 py-3 flex flex-col gap-2 place-items-center shadow-xl shadow-gray-400 bg-slate-200 rounded-xl border-2 border-gray-400"
        action=""
      >
        <img className="w-52 h-28 rounded-lg shadow-sm shadow-green-900" src={logo} alt="stayease logo" />
        <h1 className="text-xl font-bold text-gray-700">Add Manager</h1>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="email">Full name : </label>
          <input
            id="fullname"
            name="fullname"
            type="fullname"
            placeholder="Full Name"
            className="border-2 px-2 py-1 rounded-md"
            value={info.fullname}
            maxLength={30}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="email">E-mail : </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 px-2 py-1 rounded-md"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="phone">Phone : </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="XXXXXXXXXX"
            className=" border-2 px-2 py-1 rounded-md"
            value={info.phone}
            maxLength={10}
            minLength={10}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="hotelName">Hotel Name : </label>
          <input
            id="hotelName"
            name="hotelName"
            type="hotelName"
            placeholder="Hotel Name"
            className=" border-2 px-2 py-1 rounded-md"
            value={info.hotelName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="password">Default Password : </label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="........"
            className=" border-2 px-2 py-1 rounded-md"
            value={info.password}
            onChange={handleChange}
          />
        </div>
        {error &&
        (<div className="text-red-600">
          {error}
        </div>)}
        <button
          onClick={handleRegister}
          className="px-2 py-1 bg-[#048da0] rounded-md text-white border-gray-400 border-2 hover:bg-[#40bcc0] font-semibold"
          disabled={isLoading?true:false}
        >
          {isLoading?"Please wait ...":"Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddManager;
