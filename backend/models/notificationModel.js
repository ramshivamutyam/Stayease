const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    userMail:String,
    message:String,
    time:Date
})

const Notification=mongoose.models.notification || mongoose.model('notification',schema)
module.exports = Notification