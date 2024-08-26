const mongoose=require('mongoose')
require("dotenv").config()

const connectDB =async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to db")
    }catch(err){
        console.log("Error connecting to DB : "+err.message)
    }
}

module.exports = connectDB