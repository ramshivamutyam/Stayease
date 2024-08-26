const express=require("express")
const { handleGetUser, handleUpdateUser } = require("../controllers/userController")
const { verifyJWT } = require("../middleware/verifyJWT")
const router=express.Router()

router.get("/",verifyJWT,handleGetUser)
    .put("/",verifyJWT,handleUpdateUser)

module.exports=router