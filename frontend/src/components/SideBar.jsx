import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = () => {
    const {role} = useContext(Auth)
    const nav=useNavigate()
    const info=[
        {
            role:"admin",
            links:[
                {to:"/hotellist",title:"Hotels"},
                {to:"/bookings",title:"Bookings"},
                {to:"/addManager",title:"Add Manager"},
                {to:"/addHotel",title:"Add Hotel"},
                {to:"/addNotification",title:"Send Notification"},
                {to:"/editProfile",title:"Edit Profile"}
            ]
        },{
            role:"manager",
            links:[
                {to:"/hotellist",title:"Hotels"},
                {to:"/bookings",title:"Bookings"},
                // {to:"/editHotel",title:"Update Hotel"},
                {to:"/notifications",title:"Notifications"},
                {to:"/editProfile",title:"Edit Profile"}
            ]
        },{
            role:"user",
            links:[
                {to:"/hotellist",title:"Hotels"},
                {to:"/bookings",title:"Bookings"},
                {to:"/notifications",title:"Notifications"},
                {to:"/editProfile",title:"Edit Profile"}
            ]
        }
    ]
    const [links,setLinks]=useState([])
    useEffect(()=>{
        setLinks(info.filter((item)=>item.role==role)[0].links);
    },[])
  return (
    <div className='min-h-screen w-[200px] p-4 bg-gradient-to-r from-[#79e280] to-[#cef9d1] flex flex-col items-center gap-4 shadow-md shadow-green-500'>
        {
            links.map((link,ind)=>{
                return <div key={ind} onClick={()=>nav(`${link.to}`)} className='w-full font-semibold rounded-xl hover:bg-[#048da0] px-2 py-1 hover:cursor-pointer'><Link   >{link.title}</Link></div>
            })
        }
    </div>
  )
}

export default SideBar
