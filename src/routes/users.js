const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  addUserTOCustomers,
  addUserTOTradies,
  notCustomer,
  notTradie,
} = require("../controllers/users");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.post("/:id/services/:code", linkJobToService);
router.post("/:id/customers/:code", addUserTOCustomers);
router.post("/:id/tradies/:code", addUserTOTradies);
router.delete("/:id/customers/:code", notCustomer);
router.delete("/:id/tradies/:code", notTradie);
module.exports = router;
