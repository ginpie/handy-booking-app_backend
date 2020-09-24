const express = require("express");

const {
  addOrder,
  getOrder,
  getAllOrder,
  completeOrder,
  deleteOrder,
} = require("../controllers/orders");

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id/complete", completeOrder);
router.put("/:id/delete", deleteOrder);

module.exports = router;
