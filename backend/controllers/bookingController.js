const Hotel = require("../models/hotelModel");
const Booking = require("../models/bookingModel");
const connectDB = require("../utils/connectDB");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

// Fetch available room types for a hotel within a date range
async function getAvailableRoomTypes(req, res) {
  try {
    await connectDB();
    let { hotelId, startDate, endDate } = await req.body;
    const hotel = await Hotel.findById(hotelId);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const availableRoomTypes = [];

    for (let room of hotel.rooms) {
      let availableRooms = [];

      for (let roomNumber of room.roomNumbers) {
        const bookings = await Booking.find({
          hotel: hotelId,
          roomNumber: roomNumber.number,
          $or: [
            { startDate: { $lt: end }, endDate: { $gt: start } },
            { startDate: { $gte: start, $lt: end } },
            { endDate: { $gt: start, $lte: end } },
          ],
          status: "confirmed",
        });

        if (bookings.length === 0) {
          availableRooms.push(roomNumber.number);
        }
      }

      availableRoomTypes.push({
        roomType: room.roomType,
        price: room.price,
        availableRooms: availableRooms.length,
      });
    }

    return res.status(200).json(availableRoomTypes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Book a room of a specific type within a date range
async function bookRoom(req, res) {
  try {
    await connectDB();
    const userId = (await User.findOne({ email: await req.user.email }))._id;
    const { hotelId, roomType, startDate, endDate } = await req.body;
    const hotel = await Hotel.findById(hotelId);
    const room = hotel.rooms.find((room) => room.roomType === roomType);
    if (!room) throw new Error("Room type not found");

    const start = new Date(startDate);
    const end = new Date(endDate);

    let availableRoomNumber = null;

    for (let roomNumber of room.roomNumbers) {
      const bookings = await Booking.find({
        hotel: hotelId,
        roomNumber: roomNumber.number,
        $or: [
          { startDate: { $lt: end }, endDate: { $gt: start } },
          { startDate: { $gte: start, $lt: end } },
          { endDate: { $gt: start, $lte: end } },
        ],
        status: "confirmed",
      });

      if (bookings.length === 0) {
        availableRoomNumber = roomNumber.number;
        break;
      }
    }

    if (!availableRoomNumber)
      throw new Error("No available rooms of this type for the selected dates");

    // Create a booking
    const booking = new Booking({
      user: userId,
      hotel: hotelId,
      roomType: roomType,
      roomNumber: availableRoomNumber,
      startDate: startDate,
      endDate: endDate,
      totalPrice: room.price * ((end - start) / (1000 * 60 * 60 * 24)),
      status: "confirmed",
    });
    await booking.save();
    const userEmail = await req.user.email;
    await Notification.create({
      userMail: userEmail,
      message: `Your booking is comfirmed in ${hotel.name}, Please check your bookings for further details.`,
      time: new Date(),
    });

    return res.status(200).json(booking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function cancelBooking(req, res) {
  try {
    await connectDB();
    const { bookingId } = await req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    booking.status = "canceled";
    await booking.save();

    // Update room availability in the hotel schema
    const hotel = await Hotel.findById(booking.hotel);
    const roomType = hotel.rooms.find(
      (room) => room.roomType === booking.roomType
    );
    const roomNumber = roomType.roomNumbers.find(
      (rn) => rn.number === booking.roomNumber
    );

    if (roomNumber) {
      roomNumber.isAvailable = true;
      await hotel.save();
    }
    const userEmail=(await User.findOne({_id:booking.user})).email;
    await Notification.create({
      userMail: userEmail,
      message: `Your booking is cancelled in ${hotel.name}, Please check your bookings for further details.`,
      time: new Date(),
    });

    return res.status(200).json(booking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Get all confirmed bookings for admin
async function getAllBookings(req, res) {
  try {
    await connectDB();
    const data = await Booking.find({ status: "confirmed" })
      .populate("user")
      .populate("hotel");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//Get all booking of an user
async function getUserBookings(req, res) {
  try {
    await connectDB();
    const { email } = await req.user;
    const user = await User.findOne({ email: email });
    const data = await Booking.find({ user: user._id })
      .populate("user")
      .populate("hotel");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getManagerBookings(req, res) {
  try {
    await connectDB();
    const { email } = await req.user;
    const mng = await User.findOne({ email: email });
    const hotel = await Hotel.findOne({ manager: mng._id });
    const data = await Booking.find({ hotel: hotel._id })
      .populate("user")
      .populate("hotel");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

module.exports = {
  getAvailableRoomTypes,
  bookRoom,
  cancelBooking,
  getAllBookings,
  getUserBookings,
  getManagerBookings,
};
