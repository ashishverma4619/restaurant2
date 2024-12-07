const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  table: { type: Number, required: true },
  status: { type: String, default: "pending" }, 
});

module.exports = mongoose.model("Reservation", ReservationSchema);
