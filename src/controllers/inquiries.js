const Inquiry = require("../models/inquiry");

async function addInquiry(req, res) {
  const {
    zipCode,
    jobDateTime,
    contactNo,
    email,
    firstName,
    lastName,
    message,
    serviceId,
    clientId,
    tradiesId,
    // accepted,
  } = req.body;

  const createTime = new Date();
  const accepted = false;

  const inquiry = new Inquiry({
    zipCode,
    jobDateTime,
    contactNo,
    email,
    firstName,
    lastName,
    message,
    serviceId,
    clientId,
    tradiesId,
    accepted,
  });

  await inquiry.save();

  return res.status(201).json(inquiry);
}

// Create an inquiry
// async function addInquiry(req, res) {
//   const {
//     trywork,
//     zipCode,
//     jobDateTime,
//     contactNo,
//     email,
//     firstName,
//     lastName,
//     message,
//   } = req.body;
//   const inquiry = new Inquiry({
//     // trywork,
//     zipCode,
//     jobDateTime,
//     contactNo,
//     email,
//     firstName,
//     lastName,
//     message,
//   });
//   await inquiry.save();
//   return res.status(201).json(inquiry);
// }

// Read the inquiry using id
async function getInquiry(req, res) {
  const { id } = req.params;
  const inquiry = await Inquiry.findById(id).exec();
  if (!inquiry) {
    return res.status(404).json("This inquiry is not found!");
  }

  return res.json(inquiry);
}

// Read all inquiries
async function getAllInquiry(req, res) {
  const inquiries = await Inquiry.find().exec();
  return res.json(inquiries);
}

// accept the inquiry (Update)
async function acceptInquiry(req, res) {
  const { id } = req.params;
  const inquiry = await Inquiry.findByIdAndUpdate(id, {
    accepted: true,
  }).exec();
  if (!inquiry) {
    return res.status(404).json("This inquiry is not found!");
  }
  if (inquiry.accepted) {
    return res.status(406).json("This inquiry is already accepted.");
  }

  await inquiry.save();
  return res.json(inquiry);
}

// Delete an inquiry
async function deleteInquiry(req, res) {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, { deleted: true }).exec();
  if (!order) {
    return res.status(404).json("This inquiry is not found!");
  }
  if (order.deleted) {
    return res.status(406).json("This inquiry is already deleted");
  }

  await order.save();
  return res.json("This inquiry is successfully deleted");
}

// modules available
module.exports = {
  addInquiry,
  getInquiry,
  getAllInquiry,
  acceptInquiry,
  deleteInquiry,
};
