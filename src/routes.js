const express = require("express");
const router = express.Router();
const serviceRoute = require("./routes/services");
const jobRoute = require("./routes/jobs");
const userRoute = require("./routes/users");
const customerRoute = require("./routes/customers");
const tradieRoute = require("./routes/tradies");
const orderRouter = require("./routes/orders");
const inquiryRoute = require("./routes/inquiries");
const authGuard = require("./middleware/authGuard");

const logInUser = require("./routes/auth");
router.use("/auth", logInUser);
router.use("/services", serviceRoute);
router.use("/jobs", jobRoute);
router.use("/users", userRoute);
router.use("/customers", customerRoute);
// router.use("/tradies", authGuard, tradieRoute);

router.use("/tradies", tradieRoute);
router.use("/inquiry", inquiryRoute);
router.use("/order", orderRouter);
module.exports = router;
