const Inquiry = require("../models/inquiry");
const {
  addOrder
} = require("./orders");

async function addInquiry(req, res) {
  const {
    address,
    address2,
    suburb,
    state,
    zipCode,
    serviceTime,
    contactNo,
    email,
    name,
    message,
    serviceId,
    clientId,
    tradiesId,
  } = req.body;



  const createTime = new Date();
  const accepted = false;

  const inquiry = new Inquiry({
    createTime,
    address: {
      address,
      address2,
      suburb,
      state,
      zipCode,
    },
    serviceTime,
    contactNo,
    email,
    name,
    message,
    serviceId,
    clientId,
    tradiesId,
    accepted,
  });

  await inquiry.save();

  return res.status(201).json(inquiry);
}

// Read the inquiry using id
async function getInquiry(req, res) {
  const {
    id
  } = req.params;
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
  /*
  // pagination  
  const {
    page,
    pageSize
  } = req.query;
  const limit = Math.max(pageSize, 10);
  const skip = (Math.max(page, 1) - 1) * limit;
  const inquiries = await Inquiry.find().limit(limit).skip(skip).exec();
  return res.json({
    data: inquiries,
    pagination: {
      pageSize,
      page,
      totalPage
    }
  });
  */
}

async function addPrice(req, res) {
  const {
    id
  } = req.params;
  const {
    totalPrice
  } = req.body;
  const inquiry = await Inquiry.findByIdAndUpdate(id, {
    totalPrice,
  }).exec();
  if (!inquiry) {
    return res.status(404).json("This inquiry is not found!");
  }

  await inquiry.save();
  return res.json(inquiry);
}

// accept the inquiry (Update)
async function acceptInquiry(req, res) {
  const {
    id
  } = req.params;
  const inquiry = await Inquiry.findById(id).exec();
  if (!inquiry) {
    return res.status(404).json("This inquiry is not found!");
  }
  if (!inquiry.totalPrice) {
    return res.status(406).json("This inquiry is not receive a price.");
  }
  if (inquiry.accepted) {
    return res.status(406).json("This inquiry is already accepted.");
  }

  const newInquiry = await Inquiry.findByIdAndUpdate(id, {
    accepted: true,
  }).exec();

  await newInquiry.save();

  const address = `${inquiry.address} ${inquiry.address2} ${inquiry.suburb} ${inquiry.state} ${inquiry.zipCode}`;
  const {
    serviceTime,
    contactNo,
    name,
    email,
    totalPrice,
    serviceId,
    clientId,
    tradiesId
  } = inquiry;
  await addOrder({
    body: {
      serviceTime,
      address,
      contactNo,
      email,
      name,
      totalPrice,
      serviceId,
      clientId,
      tradiesId
    }
  }, res)

  return res.json(inquiry);
}

// Delete an inquiry
async function deleteInquiry(req, res) {
  const {
    id
  } = req.params;
  const order = await Order.findByIdAndUpdate(id, {
    deleted: true
  }).exec();
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
  addPrice,
  acceptInquiry,
  deleteInquiry,
};