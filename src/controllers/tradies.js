const UserModel = require("../models/user");
const TradieModel = require("../models/tradie");
const JobModel = require("../models/job");
const OrderModel = require("../models/order");
const InquiryModel = require("../models/inquiry")

async function getAllTradies(req, res) {
  const tradie = await TradieModel.find()
  .populate("users", "firstName lastName avatar")
  // .populate("inquiries", "_id")
  // .populate("jobs", "jobName description")
  // .populate("orders", "totalPrice")
  .exec();
  res.json(tradie);
}

async function getTradieAllInfo(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findById(tradieId)
  .populate("users", "_id firstName lastName avatar")
  .populate("jobs", "jobName description")
  .populate("orders", "createTime serviceTime address  contactNo  email name totalPrice  message service tradiesId rating comment")
  .populate("inquiries", "createTime serviceTime address  contactNo  email name message serviceId tradiesId totalPrice accepted")
    .exec();
  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  return res.json(tradie);
}
async function getTradieInquiries(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findById(tradieId)
    .populate("inquiries", "createTime serviceTime address  contactNo  email name message serviceId tradiesId totalPrice accepted")
    .exec();
  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  return res.json(tradie);
}

async function getTradieOrderInfo(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findById(tradieId)
    .populate("orders", "createTime serviceTime address  contactNo  email name totalPrice  message service tradiesId rating comment complete")
    .exec();
  if (!tradie) {
    return res.status(404).json("Tradie Not Found");
  }
  return res.json(tradie);
}

async function addTradie(req, res) {
  const { tradieId } = req.body;
  console.log(`DEBUG: signUp ->req.body`, req.body);
  const existTradie = await TradieModel.findById(tradieId).exec();
  if (existTradie) {
    return res.status(409).json("Already Existed");
  }
  const tradie = new TradieModel({
    tradieId,
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
  const { PostCode } = req.body;
  const tradie = await TradieModel.findByIdAndUpdate(
    tradieId,
    { PostCode },
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
    .select("tradieId jobs")
    .populate("jobs", "jobName description")
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

async function addOrderForTradie(req, res) {
  const { id, code } = req.params;
  const tradie = await TradieModel.findById(id).select("id orders").exec();
  console.log(tradie);
  // const order = await OrderModel.findById(code)
  //   .select(" _id createTime ContactNo message tradies")
  //   .exec();
  // console.log(order);
  if (!tradie) {
    return res.status(404).json("Order or Tradie Not Found");
  }
  tradie.orders.addToSet(code);
  // order.tradies.addToSet(tradie._id);
  await tradie.save();
  // await order.save();
  console.log("Tradie accept order ");
  // return res.json(tradie);
}

async function addInquiryForTradie(req, res) {
  const { id } = req.params;
  const { inquiry } = req.body;
  const tradie = await TradieModel.findById(id).select("id inquiries").exec();
  if (!tradie) {
    return res.status(404).json("Order or Tradie Not Found");
  }
  tradie.inquiries.addToSet(inquiry);
  await tradie.save();
  console.log("Tradie accept inquiry ");
}


async function TradieAcceptInquiry(req, res) {
  const { id, code } = req.params;
  const tradie = await TradieModel.findById(id).select("id inquiries").exec();
  const inquiry = await InquiryModel.findById(code)
    .select("id tradies")
    .exec();
  console.log(inquiry);
  if (!tradie || !inquiry) {
    return res.status(404).json("Inquiry or Tradie Not Found");
  }
  tradie.inquiries.addToSet(inquiry._id);
  inquiry.tradies.addToSet(tradie._id);
  await tradie.save();
  await inquiry.save();
  console.log("Tradie Accept inquiry ");
  return res.json(tradie);
}
module.exports = {
  getAllTradies,
  getTradieAllInfo,
  getTradieOrderInfo,
  addTradie,
  deleteTradie,
  updateTradie,
  addJobForTradie,
  addOrderForTradie,
  getTradieInquiries,
  TradieAcceptInquiry,
  addInquiryForTradie
};
