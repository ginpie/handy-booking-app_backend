const Inquiry = require("../models/inquiry");
const ServiceModel = require("../models/service");
const {
  addOrder
} = require("./orders");

async function addInquiry(req, res) {
  const {
    address,
    serviceTime,
    contactNo,
    email,
    name,
    message,
    // serviceId,
    // clientId,
    // tradiesId,
  } = req.body;
  const createTime = new Date();
  const accepted = false;
  const inquiry = new Inquiry({
    createTime,
    address,
    serviceTime,
    contactNo,
    email,
    name,
    message,
    // serviceId,
    // clientId,
    // tradiesId,
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
  const inquiry = await Inquiry.findById(id)
  .populate("services")
  .populate("customers")
  .populate("tradies")
  .exec();
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

  //const address = `${inquiry.address1} ${inquiry.address2} ${inquiry.suburb} ${inquiry.state} ${inquiry.zipCode}`;
  const {
    serviceTime,
    contactNo,
    address,
    name,
    email,
    totalPrice,
    services,
    customers,
    tradies
  } = inquiry;
  await addOrder({
    body: {
      serviceTime,
      address,
      contactNo,
      email,
      name,
      totalPrice,
      services,
      customers,
      tradies
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

async function linkInquiryToService(req, res) {
  const { id, code } = req.params;
  const inquiry = await Inquiry.findById(id)
    .select("services ")
    .exec();
  const service = await ServiceModel.findById(code)
    .select("inquiries")
    .exec();
  if (!inquiry || !service) {
    return res.status(404).json("Inquiry or Service Not Found");
  }
  if (inquiry.services.length == 0) {
    inquiry.services.addToSet(service._id);
    service.inquiries.addToSet(inquiry._id);
    await inquiry.save();
    await service.save();
    console.log("link successful beteween Inquiry and Service");
    return res.json(inquiry);
  } 
  else {
    const copyItem = inquiry.services.slice();
    const inquiryServicesExistedItem = copyItem[0];
    const preService = await ServiceModel.findById(inquiryServicesExistedItem)
      .select("inquiries")
      .exec();
    preService.inquiries.pull(inquiry._id);
    await preService.save();
    inquiry.services.pop();
    inquiry.services.addToSet(service._id);
    service.inquiries.addToSet(inquiry._id);
    await inquiry.save();
    await service.save();
    console.log("Update Link");
    return res.json(inquiry);
  }
}

// modules available
module.exports = {
  addInquiry,
  getInquiry,
  getAllInquiry,
  addPrice,
  acceptInquiry,
  deleteInquiry,
  linkInquiryToService,
};