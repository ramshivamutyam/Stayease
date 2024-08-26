const express=require('express')
const { verifyJWT, verifyRole } = require('../../middleware/verifyJWT')
const { handleGetNotifications, handleSendNotification } = require('../../controllers/notificaitonController')
const router=express.Router()

router.post('/',verifyJWT,verifyRole,handleSendNotification)
    .get('/',verifyJWT,handleGetNotifications)

module.exports = router