const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  addOrderForCustomers,
} = require("../controllers/customers");
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.post("/", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/:id/order/:code", addOrderForCustomers);
module.exports = router;
