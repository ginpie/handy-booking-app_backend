const express = require("express");
const {
  getAllTradies,
  getTradieAllInfo,
  addTradie,
  deleteTradie,
  updateTradie,
  addJobForTradie,
  addOrderForTradie,
  getTradieInquiries,
} = require("../controllers/tradies");
const router = express.Router();

router.get("/", getAllTradies);
router.get("/:id", getTradieAllInfo);
router.get("/:id/inquiry", getTradieInquiries);
router.post("/", addTradie);
router.put("/:id", updateTradie);
router.delete("/:id", deleteTradie);
router.post("/:id/jobs/:code", addJobForTradie);
router.post("/:id/order/:code", addOrderForTradie);
module.exports = router;
