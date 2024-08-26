const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phone:{type:Number,unique:true,required:true},
  passwordHash: { type: String, required: true },
  fullName: { type: String },
  role:{
    isAdmin:{type:Boolean, default:false},
    isUser:{type:Boolean,default:false},
    isManager:{type:Boolean,default:false}
  }
});

userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('notifications', {
  ref: 'Notification',
  localField: '_id',
  foreignField: 'user'
});

const User =mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
