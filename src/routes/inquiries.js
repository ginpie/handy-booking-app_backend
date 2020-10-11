const express = require("express");

const {
  addInquiry,
  getInquiry,
  getAllInquiry,
  acceptInquiry,
  deleteInquiry,
} = require("../controllers/inquiries");

const router = express.Router();

router.get("/", getAllInquiry);
router.get("/:id", getInquiry);
router.post("/", addInquiry);
router.put("/:id/accepted", acceptInquiry);
router.put("/:id/delete", deleteInquiry);

module.exports = router;
