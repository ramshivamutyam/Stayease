const express=require("express")
const cors=require("cors")
require("dotenv").config()



const app=express()
app.use(express.json())
app.use(cors())
app.use("/login",require('./routes/user/auth/login'))
app.use("/register",require("./routes/user/auth/register"))
app.use("/admin/hotels",require("./routes/admin/hotels"))
app.use("/user/hotels",require("./routes/user/hotels"))
app.use("/hotels",require("./routes/hotels"))
app.use("/user/bookings",require("./routes/user/bookings"))
app.use("/manager/bookings",require("./routes/manager/bookings"))
app.use("/admin/bookings",require("./routes/admin/bookings"))
app.use("/admin/users",require("./routes/admin/users"))
app.use("/userProfile",require("./routes/user"))
app.use("/admin/notifications",require("./routes/admin/notification"))
app.use("/manager/notifications",require("./routes/manager/notifications"))
app.use("/user/notifications",require("./routes/user/notifications"))




app.listen(process.env.PORT,(err)=>{
    if(err) console.log("Couldn't start server: "+err.message);
    else console.log("Server started on port:"+process.env.PORT);
})