const express = require("express");
const {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  reNewJob,
  superDeleteJob,
  linkJobToService,
  removeJobFromService,
} = require("../controllers/jobs");
const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", addJob);
router.put("/:id", updateJob);
router.post("/:id", deleteJob);
router.delete("/:id", superDeleteJob);
router.post("/:id", reNewJob);
router.post("/:id/services/:code", linkJobToService);
router.delete("/:id/services/:code", removeJobFromService);
module.exports = router;
