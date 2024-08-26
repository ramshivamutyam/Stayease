const Notification = require("../models/notificationModel");
const users=require("../models/userModel")
const connectDB=require("../utils/connectDB")

const handleSendNotification =async (req,res)=>{
    try{
        await connectDB();
        const {email,message}=await req.body;
        const exist=await users.findOne({email:email})
        if(!exist) throw new Error("User not exist");
        await Notification.create({
            userMail:email,
            message:message,
            time:new Date()
        })
        res.status(200).json({message:"Notification sent"});
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

const handleGetNotifications = async (req,res)=>{
    try{
        await connectDB();
        const {email} =await req.user;
        const data=await Notification.find({userMail:email})
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

module.exports = {handleGetNotifications,handleSendNotification}