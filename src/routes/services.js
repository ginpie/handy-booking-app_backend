const express = require("express");
const {
  getAllServices,
  addService,
  updateService,
  deleteService,
  getService,
} = require("../controllers/services");
const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getService);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
