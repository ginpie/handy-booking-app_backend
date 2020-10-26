const express = require("express");
const auth = require("../controllers/auth");
const { logInUser,stayLogIn } = require("../controllers/auth");
const router = express.Router();
router.post("/", logInUser);
router.get("/", stayLogIn);
module.exports = router;
