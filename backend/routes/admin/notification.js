const express=require('express')
const router=express.Router()
const { verifyJWT, verifyRole } = require('../../middleware/verifyJWT');
const { handleSendNotification } = require('../../controllers/notificaitonController');

router.post('/',verifyJWT,verifyRole('isAdmin'),handleSendNotification)

module.exports = router