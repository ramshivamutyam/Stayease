/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { useContext } from "react";
import { Auth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/loginVector.avif"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState("")
  const {dispatch} =useContext(Auth)
  const nav = useNavigate();
  // const [role, setRole] = useState("");
  const {token} = useContext(Auth)
  useEffect(()=>{
    if(token !== null){
      nav("/");
    }
  },[token,nav])
  
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      setIsLoading(true);
      setError("")
      if(!email || !password) throw new Error("All Credentials Required");
      const res=await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      });
      if(res.ok){
        let r=await res.json();
        console.log("login successfull")
        localStorage.setItem("token",r.token)
        localStorage.setItem("role",r.role);
        dispatch({"type":"LOGIN",payload:{"token":r.token,"role":r.role}})
        nav(-1);
      }else{
        let r=await res.json()
        throw new Error(r.message);
      }
    }catch(err){
      setError(err.message);
      console.log("Error : "+err.message);
    }finally{
      setIsLoading(false);
    }
  };
  

  return (
    <div className="h-screen bg-white flex justify-center gap-24 items-center" >
      <div className="w-[500px]">
        <img src={Image} alt="image" />
      </div>
      <form
        className="w-fit h-fit px-6 py-3 flex flex-col gap-2 place-items-center bg-slate-200 rounded-xl border-2 border-gray-400 shadow-md shadow-slate-500"
        action=""
      >
        <img className="w-52 h-28 rounded-lg shadow-sm shadow-green-900" src={logo} alt="stayease logo" />
        <h1 className="text-xl font-bold text-gray-700">LOGIN</h1>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="email">E-mail : </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-2 px-2 py-1 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className=" border-2 px-2 py-1 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error &&
        (<div className="text-red-600">
          {error}
        </div>)}
        <button
          onClick={handleLogin}
          className="px-2 py-1 bg-[#048da0] rounded-md text-white border-gray-400 border-2 hover:bg-[#40bcc0] font-semibold"
          disabled={isLoading?true:false}
        >
          {isLoading?"Loging in ...":"Submit"}
        </button>
        <div className="font-semibold text-green-700 hover:underline hover:cursor-pointer" onClick={()=>nav('/register')}>
          New to Stayease ?
        </div>
      </form>
    </div>
  );
};

export default Login;
