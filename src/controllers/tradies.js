const UserModel = require("../models/user");
const TradieModel = require("../models/tradie");
const JobModel = require("../models/job");

async function getAllTradies(req, res) {
  const tradie = await TradieModel.find().exec();
  res.json(tradie);
}

async function getTradie(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findById(tradieId)
    .populate("users", "_id firstName lastName")
    .exec();
  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  return res.json(tradie);
}

async function addTradie(req, res) {
  const { tradieId, workTime } = req.body;
  const existTradie = await TradieModel.findById(tradieId).exec();
  if (existTradie) {
    return res.status(409).json("Already Existed");
  }
  const tradie = new TradieModel({
    tradieId,
    workTime,
  });

  await tradie.save();
  return res.status(201).json(tradie);
}

async function deleteTradie(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findByIdAndDelete(tradieId);
  if (!tradie) {
    return res.status(404).json("tradie not found");
  }

  await UserModel.updateMany(
    { tradies: tradie._id },
    { $pull: { tradies: tradie._id } }
  ).exec();
  return res.sendStatus(200);
}

async function updateTradie(req, res) {
  const { id: tradieId } = req.params;
  const { workTime } = req.body;
  const tradie = await TradieModel.findByIdAndUpdate(
    tradieId,
    { workTime },
    { new: true }
  ).exec();

  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  await tradie.save();
  return res.json(tradie);
}
//1个tradie有很多job，job只分配给1个tradie
async function addJobForTradie(req, res) {
  const { id, code } = req.params;

  const tradie = await TradieModel.findById(id)
    .select("tradieId jobs workTime")
    .exec();
  const job = await JobModel.findById(code)
    .select("tradies jobName description")
    .exec();
  if (!job || !tradie) {
    return res.status(404).json("Job or Tradie Not Found");
  }
  if (job.tradies.length == 0) {
    job.tradies.addToSet(tradie._id);

    tradie.jobs.addToSet(job._id);
    await job.save();
    await tradie.save();
    console.log("link successful beteween job and tradie");
    return res.json(tradie);
  } else {
    const copyItem = job.tradies.slice();

    const jobTradieesExistedItem = copyItem[0];

    const preTradie = await TradieModel.findById(jobTradieesExistedItem)
      .select("jobs")
      .exec();
    preTradie.jobs.pull(job._id);
    await preTradie.save();
    job.tradies.pop();
    job.tradies.addToSet(tradie._id);
    tradie.jobs.addToSet(job._id);
    await job.save();
    await tradie.save();
    console.log("Update Link");
    return res.json(tradie);
  }
}
module.exports = {
  getAllTradies,
  getTradie,
  addTradie,
  deleteTradie,
  updateTradie,
  addJobForTradie,
};
