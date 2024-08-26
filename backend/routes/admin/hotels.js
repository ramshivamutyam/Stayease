const express=require('express')
const router=express.Router()
const hotelController=require("../../controllers/hotelController");
const { verifyJWT, verifyRole } = require('../../middleware/verifyJWT');

router.post("/",verifyJWT,verifyRole("isAdmin"),hotelController.handleHotelRegister)
    .delete("/",verifyJWT,verifyRole("isAdmin"),hotelController.handleDeleteHotel)

module.exports = router;