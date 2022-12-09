const Order = require("../models/orderModel");

const fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      address,
      product_name,
      product_price,
      total_amount,
    } = req.body;
    if (name && email && contact && address) {
      const order = await Order.create({
        name,
        email,
        contact,
        address,
        product_name,
        product_price,
        total_amount,
      });
      if (order) {
        res.status(200).send({ msg: "Order Successful" });
      } else {
        throw new Error("Fail to order");
      }
    } else {
      throw new Error("Enter all fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Order Fail" });
  }
};

module.exports = {
  fetchOrders,
  createOrder,
};
