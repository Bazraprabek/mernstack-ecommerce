const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/connection");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
