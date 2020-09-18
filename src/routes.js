const express = require('express');

const router = express.Router();

const orderRouter = require('./routes/orders');

router.use('/order', orderRouter);


module.exports = router;