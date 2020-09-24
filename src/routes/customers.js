const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers");
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.post("/", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
