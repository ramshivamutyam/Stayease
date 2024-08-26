const mongoose=require('mongoose')

const roomNumberSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true } // Availability status
});

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  roomNumbers: { type: [roomNumberSchema], required: true },
  price: { type: Number, required: true } // Price for the room type
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  amenities: { type: [String], required: true },
  rooms: { type: [roomSchema], required: true }, // Embedded room schema with price and availability
  image:{
    publicId:String,url:String
  },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

hotelSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'hotel'
});

hotelSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'hotel'
});
  
const Hotel =mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
  