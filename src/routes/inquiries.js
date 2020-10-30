const express = require("express");

const {
  addInquiry,
  getInquiry,
  getAllInquiry,
  addPrice,
  acceptInquiry,
  deleteInquiry,
  linkInquiryToService,
} = require("../controllers/inquiries");

const router = express.Router();

router.get("/", getAllInquiry);
router.get("/:id", getInquiry);
router.post("/", addInquiry);
router.put("/:id/accepted", acceptInquiry);
router.put("/:id/price", addPrice);
router.put("/:id/delete", deleteInquiry);
router.post("/:id/services/:code", linkInquiryToService);
module.exports = router;
