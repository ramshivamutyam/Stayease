const express=require("express")
const { verifyJWT, verifyRole } = require("../../middleware/verifyJWT")
const { getManagerBookings, cancelBooking } = require("../../controllers/bookingController")
const router=express.Router()

router.get("/",verifyJWT,verifyRole("isManager"),getManagerBookings)
    .post("/cancel",verifyJWT,verifyRole("isManager"),cancelBooking)

module.exports = router