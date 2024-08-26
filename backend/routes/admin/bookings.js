const express=require("express")
const { getAllBookings, cancelBooking } = require("../../controllers/bookingController")
const { verifyJWT, verifyRole } = require('../../middleware/verifyJWT');
const router=express()

router.get("/",verifyJWT,verifyRole("isAdmin"),getAllBookings)
    .post("/cancel",verifyJWT,verifyRole("isAdmin"),cancelBooking);

module.exports = router;