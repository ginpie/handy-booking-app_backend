const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  updateUserAvatar,
  addUserTOCustomers,
  addUserTOTradies,
  notCustomer,
  notTradie,
  updateUserPassword,
} = require("../controllers/users");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.put("/:id/avatar", updateUserAvatar);
router.put("/:id/password", updateUserPassword);
router.delete("/:id", deleteUser);
// router.post("/:id/services/:code", linkJobToService);
router.post("/:id/customers/:code", addUserTOCustomers);
router.post("/:id/tradies/:code", addUserTOTradies);
router.delete("/:id/customers/:code", notCustomer);
router.delete("/:id/tradies/:code", notTradie);
module.exports = router;
