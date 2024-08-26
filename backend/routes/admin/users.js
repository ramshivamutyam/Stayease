const express=require('express')
const router=express.Router()
const { verifyJWT, verifyRole } = require('../../middleware/verifyJWT');
const { handleManagerRegister } = require('../../controllers/registerController');
const { handleDeleteUser } = require('../../controllers/userController');

router.post("/addManager",verifyJWT,verifyRole("isAdmin"),handleManagerRegister)
    // .get("/",verifyJWT,verifyRole("isAdmin"),)
    .delete("/",verifyJWT,verifyRole("isAdmin"),handleDeleteUser)

module.exports = router;