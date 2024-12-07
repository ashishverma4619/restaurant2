const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number }],
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
