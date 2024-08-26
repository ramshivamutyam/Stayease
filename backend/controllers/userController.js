const User = require("../models/userModel");
const connectDB = require("../utils/connectDB")
const bcrypt=require("bcrypt")

//for admin user control deletion e.t.c
async function handleGetUserAll(req,res){
    try{
        await connectDB();
        const data=await User.find((user)=>user.role["isUser"]);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

//for user profile purpose
async function handleGetUser(req,res){
    try{
        await connectDB();
        const email = await req.user.email;
        // console.log(await res.user)
        const data=await User.findOne({email:email});
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handleDeleteUser(req,res){
    try{
        await connectDB();
        const {userId}=await req.body;
        await User.deleteOne({_id:userId});
        res.status(200).json({message:"User deleted successflly"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handleUpdateUser(req,res){
    try{
        await connectDB();
        const {email,fullname,phone,password}=await req.body;
        const user=await User.findOne({phone:phone})
        if(user && user.email!=email) throw new Error("Phone number exists")
        const passHash=await bcrypt.hash(password,10)
        await User.updateOne({email:email},{$set:{
            fullName:fullname,
            phone:phone,
            passwordHash:passHash
        }})
        return res.status(200).json({message:"Update Successfull"})
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports ={
    handleGetUserAll,
    handleGetUser,
    handleDeleteUser,
    handleUpdateUser
}