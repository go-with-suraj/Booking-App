const Booking = require("../models/Booking");
const getUserFromToken = require("../utils/getUserFromToken");

exports.createBooking = async (req, res) => {
  const userData = await getUserFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  const bookingDoc = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  });

  res.json(bookingDoc);
};

exports.getBookings = async (req, res) => {
  const userData = await getUserFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
};
