const UserModel = require("../models/user");
const CustomerModel = require("../models/customer");
const OrderModel = require("../models/order");
const InquiryModel = require("../models/inquiry");
async function getAllCustomers(req, res) {
  const customer = await CustomerModel.find().exec();
  res.json(customer);
}

async function getCustomerAllInfo(req, res) {
  const { id: customerId } = req.params;
  const customer = await CustomerModel.findById(customerId)
    .populate("users", "_id firstName lastName avatar")
    .populate("jobs", "jobName description")
    .populate("orders", "createTime serviceTime address  contactNo  email name totalPrice  message service tradiesId rating comment")
    .populate("inquiries", "createTime serviceTime address  contactNo  email name message serviceId tradiesId totalPrice accepted")
    .exec();
  if (!customer) {
    return res.status(404).json("customer Not Found");
  }
  return res.json(customer);
}


async function getCustomerOrderInfo(req, res) {
  const { id: customerId } = req.params;
  const customer = await CustomerModel.findById(customerId)
    .populate("orders", "createTime serviceTime address  contactNo  email name totalPrice  message service tradiesId rating comment")
    .exec();
  if (!customer) {
    return res.status(404).json("customer Not Found");
  }
  return res.json(customer);
}

async function addCustomer(req, res) {
  const { customerId } = req.body;
  console.log(`DEBUG: signUp ->req.body`, req.body);
  const existCustomer = await CustomerModel.findById(customerId).exec();
  if (existCustomer) {
    return res.status(409).json("Already Existed");
  }
  const user = new CustomerModel({
    customerId,  
  });
  await user.save();
  return res.status(201).json(user);
}

async function deleteCustomer(req, res) {
  const { id: customerId } = req.params;
  const customer = await CustomerModel.findByIdAndDelete(customerId);
  if (!customer) {
    return res.status(404).json("customer not found");
  }

  await UserModel.updateMany(
    { customers: customer._id },
    { $pull: { customers: customer._id } }
  ).exec();
  return res.sendStatus(200);
}

async function updateCustomerAddress(req, res) {
  const { id: customerId } = req.params;
  const { address } = req.body;
  const customer = await CustomerModel.findByIdAndUpdate(
    customerId,
    { address },
    { new: true }
  ).exec();

  if (!customer) {
    return res.status(404).json("customer Not Found");
  }
  await customer.save();
  return res.json(customer);
}

async function addOrderForCustomers(req, res) {
  const { id, code } = req.params;
  const customer = await CustomerModel.findById(id).select("id orders").exec();
  const order = await OrderModel.findById(code)
    .select(" _id createTime ContactNo message clientId")
    .exec();
  console.log(order);
  if (!customer || !order) {
    return res.status(404).json("Order or Customer Not Found");
  }
  customer.orders.addToSet(order._id);
  order.clientId.addToSet(customer._id);
  await customer.save();
  await order.save();
  console.log("customer sent a order ");
  return res.json(customer);
}
async function CustomersSendInquiry(req, res) {
  const { id, code } = req.params;
  const customer = await CustomerModel.findById(id).select("id inquiries").exec();
  const inquiry = await InquiryModel.findById(code)
    .select("id customers")
    .exec();
  console.log(inquiry);
  if (!customer || !inquiry) {
    return res.status(404).json("Inquiry or Customer Not Found");
  }
  customer.inquiries.addToSet(inquiry._id);
  inquiry.customers.addToSet(customer._id);
  await customer.save();
  await inquiry.save();
  console.log("customer sent a inquiry ");
  return res.json(customer);
}
module.exports = {
  getAllCustomers,
  getCustomerAllInfo,
  addCustomer,
  deleteCustomer,
  updateCustomerAddress,
  addOrderForCustomers,
  getCustomerOrderInfo,
  CustomersSendInquiry,
};
