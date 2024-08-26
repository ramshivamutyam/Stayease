const express=require('express');
const { handleGetNotifications } = require('../../controllers/notificaitonController');
const { verifyJWT } = require('../../middleware/verifyJWT');
const router=express.Router()

router.get('/',verifyJWT,handleGetNotifications);

module.exports=router;