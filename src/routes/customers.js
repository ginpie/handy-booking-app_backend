const express = require("express");
const {
  getAllCustomers,
  getCustomerAllInfo,
  addCustomer,
  deleteCustomer,
  updateCustomerAddress,
  addOrderForCustomers,
  getCustomerOrderInfo,
} = require("../controllers/customers");
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomerAllInfo);
router.post("/", addCustomer);
router.put("/:id", updateCustomerAddress);
router.delete("/:id", deleteCustomer);
router.post("/:id/order/:code", addOrderForCustomers);
router.get("/:id/order", getCustomerOrderInfo);
module.exports = router;
