const connectDB=require("../utils/connectDB")
const hotels=require("../models/hotelModel");
const Hotel = require("../models/hotelModel");

const handleHotelRegister =async (req,res)=>{
    try{
        await connectDB();
        const data=await req.body;
        const exist =await hotels.findOne({name:data.name});
        if(exist) throw new Error("Hotel with name exists")
        await hotels.create({
            "name":data.name,
            "description":data.description,
            "location":data.location,
            "amenities":data.amenities,
            "rooms":data.rooms,
            "availableRooms":data.availableRooms,
        })
        res.status(200).send({message:"Hotel registered successfully"})
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const handleGetHotels = async (req,res)=>{
    try{
        await connectDB();
        let data=await Hotel.find();
        return res.status(200).json(data);
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const handleDeleteHotel = async (req,res)=>{
    try{
        await connectDB();
        const {hotelId}=await req.body;
        await Hotel.deleteOne({_id:hotelId});
        res.status(200).json({message:"Hotel deleted successfully"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const handleGetHotelDetails = async (req,res)=>{
    try{
        await connectDB();
        const {id} = await req.params
        console.log(id);
        const data=await Hotel.findOne({_id:id}).populate("manager");
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports={handleHotelRegister,handleDeleteHotel,handleGetHotels,handleGetHotelDetails}