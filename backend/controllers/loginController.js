const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const connectDB=require("../utils/connectDB")
const users=require("../models/userModel")
require("dotenv").config()

const handleLogin =async (req,res)=>{
    try{
        await connectDB();
        const {email,password} = await req.body;
        if(!email || !password) throw new Error("email and password required");
        const foundUser=await users.findOne({email:email})
        if(!foundUser) throw new Error("User not found");
        const match=await bcrypt.compare(password,foundUser.passwordHash);
        if(!match) throw new Error("Password mismatch");
        const token=jwt.sign({
            "email":email,
            "role":foundUser.role
        },
        process.env.SEC_KEY,
        {expiresIn:'1d'}
        );
        let r;
        if(foundUser.role["isAdmin"]) r='admin'
        else if(foundUser.role["isUser"]) r="user"
        else r="manager"
        res.status(200).json({message:"Login Successfull","token":token,role:r}) 
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = {handleLogin};