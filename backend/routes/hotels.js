const express=require("express")
const { handleGetHotels, handleGetHotelDetails } = require("../controllers/hotelController")
const router=express.Router()

router.get("/",handleGetHotels)
    .get("/:id",handleGetHotelDetails)

module.exports = router