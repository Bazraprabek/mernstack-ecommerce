const express = require("express");
const { fetchOrders, createOrder } = require("../controllers/orderController");
const router = express();
const { Protected } = require("../middlewares/auth");

router.route("/").get(Protected, fetchOrders);
router.route("/create").post(Protected, createOrder);

module.exports = router;
