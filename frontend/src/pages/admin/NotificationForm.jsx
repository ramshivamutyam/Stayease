import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function NotificationForm(){
    const {token,role}=useContext(Auth)
    const [info,setInfo]=useState({email:"",message:""})
    const [error,setError]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const nav=useNavigate();
    useEffect(()=>{
        if(!role || role!='admin')
            nav('/')
    },[])
    function handleChange(e) {
        setInfo((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      }
      async function handlesubmit(e){
        e.preventDefault();
        try{
            setIsLoading(true)
            if(!info.email || !info.message) throw new Error("All fields required");
            const res=await fetch("http://localhost:3000/admin/notifications",{
                method:"post",
                headers:{
                    "content-type":"application/json",
                    "authorization":token
                },
                body:JSON.stringify(info)
            })
            const result=await res.json();
            if(res.ok){
                console.log("notification sent successfully")
            }
            if(!res.ok)
                throw new Error(result.message);
        }catch(e){
            setError(e.message);
        }finally{
            setIsLoading(false);
        }
            
      }
  return (
    <div className=" flex flex-col items-center mt-10">
      <form
        className="w-fit h-fit px-6 py-3 flex flex-col gap-2 place-items-center bg-slate-200 rounded-xl border-2 border-gray-400"
        action=""
      >
        <h1 className='font-bold'>Send Notification</h1>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="email">Reciever Mail : </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Mail"
            className="border-2 px-2 py-1 rounded-md"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-[300px]">
          <label htmlFor="message">Message : </label>
          <input
            id="message"
            type="message"
            name="message"
            placeholder="message"
            className="border-2 px-2 py-1 rounded-md"
            value={info.message}
            onChange={handleChange}
          />
        </div>
        {error &&
        (<div className="text-red-600">
          {error}
        </div>)}
        <button
          onClick={handlesubmit}
          className="px-2 py-1 bg-[#048da0] rounded-md text-white border-gray-400 border-2 hover:bg-[#40bcc0] font-semibold"
          disabled={isLoading?true:false}
        >
          {isLoading?"Please wait ...":"Send"}
        </button>
      </form>
    </div>
  )
}

export default NotificationForm
