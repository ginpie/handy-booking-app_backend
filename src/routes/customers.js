const express = require("express");
const {
  getAllCustomers,
  getCustomerAllInfo,
  addCustomer,
  deleteCustomer,
  updateCustomerAddress,
  addOrderForCustomers,
  getCustomerOrderInfo,
  CustomersSendInquiry,
  addInquiryForCustomer,
  getCustomerInquiryInfo,
} = require("../controllers/customers");
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomerAllInfo);
router.post("/", addCustomer);
router.put("/:id", updateCustomerAddress);
router.delete("/:id", deleteCustomer);
router.post("/:id/order/:code", addOrderForCustomers);
router.get("/:id/order", getCustomerOrderInfo);
router.get("/:id/inquiry", getCustomerInquiryInfo);
router.post("/:id/inquiry/:code", CustomersSendInquiry);
router.put("/:id/inquiry", addInquiryForCustomer);

module.exports = router;
