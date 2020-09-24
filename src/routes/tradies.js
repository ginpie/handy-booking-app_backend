const express = require("express");
const {
  getAllTradies,
  getTradie,
  addTradie,
  deleteTradie,
  updateTradie,
  addJobForTradie,
} = require("../controllers/tradies");
const router = express.Router();

router.get("/", getAllTradies);
router.get("/:id", getTradie);
router.post("/", addTradie);
router.put("/:id", updateTradie);
router.delete("/:id", deleteTradie);
router.post("/:id/jobs/:code", addJobForTradie);
module.exports = router;
