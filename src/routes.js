
// const orderRouter = require("./routes/orders");
// const inquiryRoute = require("./routes/inquiries");

// router.use("/order", orderRouter);
// router.use("/inquiry", inquiryRoute);
const express = require("express");
const router = express.Router();
const serviceRoute = require("./routes/services");
const jobRoute = require("./routes/jobs");
const userRoute = require("./routes/users");
const customerRoute = require("./routes/customers");
const tradieRoute = require("./routes/tradies");
router.use("/services", serviceRoute);
router.use("/jobs", jobRoute);
router.use("/users", userRoute);
router.use("/customers", customerRoute);
router.use("/tradies", tradieRoute);
module.exports = router;

module.exports = router;
