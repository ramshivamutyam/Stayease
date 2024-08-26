import React, { useContext, useEffect, useState } from 'react'
import { Auth } from "../Contexts/AuthContext";
import { Navigate, useNavigate } from 'react-router-dom';

function Notifications() {
  const nav=useNavigate();
  const {token,role}=useContext(Auth);
  const [data,setData]=useState([])
  async function getInfo(){
    const res=await fetch(`http://localhost:3000/${role}/notifications`,{
      method:"get",
      headers:{
        authorization:token
      }
    })
    const d=await res.json();
    await d.sort((a,b)=>{
      return (new Date(b.time)-(new Date(a.time)))
    })
    setData(d)
  }
  useEffect(()=>{
    if(!token)
      nav('/');
    getInfo();
  },[])
  return (
    <>
      <div className='text-center font-bold text-2xl my-4'>Notifications</div>
      <hr className='border-red-500 border-1'/>
      {data.length==0 && <div>No Notifications..</div>}
      {data && 
        data.map((item,ind)=>{
          return <div key={ind} className='border-1 rounded-md bg-blue-200 m-3 px-3 py-1'>
            <div className='font-semibold'>{item.message}</div>
            <div className='font-light text-sm text-end'>{new Date(item.time).toDateString()}</div>
             </div>
        })
      }
    </>
  )
}

export default Notifications
