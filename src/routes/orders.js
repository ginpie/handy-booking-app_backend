const express = require("express");

const {
  addOrder,
  getOrder,
  getAllOrder,
  completeOrder,
  deleteOrder,
  addReviews,
  getOrdersByTradies,
  linkOrderToService,
} = require("../controllers/orders");

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id/complete", completeOrder);
router.put("/:id/delete", deleteOrder);
router.put("/:id/review", addReviews);
router.get("/:id/reviews", getOrdersByTradies);
router.post("/:id/services/:code", linkOrderToService);
module.exports = router;
