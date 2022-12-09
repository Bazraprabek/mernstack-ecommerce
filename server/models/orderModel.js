const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  total_amount: { type: Number, required: true },
  order_at: { type: Date, default: Date.now() },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
