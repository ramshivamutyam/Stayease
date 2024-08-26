const bcrypt=require("bcrypt")
const connectDB=require("../utils/connectDB")
const users=require("../models/userModel")
const hotels=require("../models/hotelModel")
require("dotenv").config()

const handleRegister =async (req,res)=>{
    try{
        await connectDB();
        const data=await req.body;
        // console.log(data)
        const existEmail=await users.findOne({email:data.email});
        if(existEmail) throw new Error("email exists");
        const existPhone=await users.findOne({phone:data.phone})
        if(existPhone) throw new Error("User with phone number exists")
        const codedPass=await bcrypt.hash(data.password,10)
        await users.create({
            "email":data.email,
            "phone":data.phone,
            "passwordHash":codedPass,
            "fullName":data.fullname,
            "role":{
                "isUser":true
            }
        })
        res.status(200).send({message:"User Created successfully"}) 
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const handleManagerRegister = async (req,res)=>{
    try{
        await connectDB();
        const data=await req.body;
        const existEmail=await users.findOne({email:data.email});
        if(existEmail) throw new Error("email exists");
        const existPhone=await users.findOne({phone:data.phone})
        if(existPhone) throw new Error("User with phone number exists")
        const codedPass=await bcrypt.hash(data.password,10)
        const hotel=await hotels.findOne({name:data.hotelName});
        if(!hotel) throw new Error("Hotel with name not exist.");
        const user=await users.create({
            "email":data.email,
            "phone":data.phone,
            "passwordHash":codedPass,
            "fullName":data.fullname,
            "role":{
                "isManager":true
            }
        })
        if(hotel.manager){
            await users.deleteOne({_id:hotel.manager._id});
            console.log("preivous manager deleted");
        }
        hotel.manager=user._id;
        await hotel.save()
        // await hotels.updateOne({name:data.hotelName},{manager:user._id})
        res.status(200).send({message:"Manager added successfully"}) 
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

module.exports = {handleRegister,handleManagerRegister};