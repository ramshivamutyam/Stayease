
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: Number, required: true }, // Room number for the booking
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
module.exports = Booking;
