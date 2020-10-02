const express = require("express");
const { logInUser } = require("../controllers/auth");
const router = express.Router();
router.post("/", logInUser);
module.exports = router;
