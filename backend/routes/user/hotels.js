const express=require("express")
const { getAvailableRoomTypes, bookRoom, cancelBooking } = require("../../controllers/bookingController")
const { verifyJWT, verifyRole } = require("../../middleware/verifyJWT")
const router=express.Router()


router.post("/availability",verifyJWT,verifyRole("isUser"),getAvailableRoomTypes)
router.post("/book",verifyJWT,verifyRole("isUser"),bookRoom)

module.exports = router;