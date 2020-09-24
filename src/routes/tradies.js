const express = require("express");
const {
  getAllTradies,
  getTradie,
  addTradie,
  deleteTradie,
  updateTradie,
  addJobForTradie,
  addOrderForTradie,
} = require("../controllers/tradies");
const router = express.Router();

router.get("/", getAllTradies);
router.get("/:id", getTradie);
router.post("/", addTradie);
router.put("/:id", updateTradie);
router.delete("/:id", deleteTradie);
router.post("/:id/jobs/:code", addJobForTradie);
router.post("/:id/order/:code", addOrderForTradie);
module.exports = router;
