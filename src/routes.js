const express = require("express");

const router = express.Router();

const orderRouter = require("./routes/orders");
const inquiryRoute = require("./routes/inquiries");

router.use("/order", orderRouter);
router.use("/inquiry", inquiryRoute);

module.exports = router;
