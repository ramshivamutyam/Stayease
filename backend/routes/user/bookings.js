const express=require("express")
const { verifyJWT, verifyRole } = require("../../middleware/verifyJWT")
const {getUserBookings,cancelBooking } = require("../../controllers/bookingController")
const router=express.Router()

router.post("/cancel",verifyJWT,verifyRole("isUser"),cancelBooking)
    .get("/",verifyJWT,verifyRole("isUser"),getUserBookings)

module.exports=router