const UserModel = require("../models/user");
const CustomerModel = require("../models/customer");
const OrderModel = require("../models/order");

async function getAllCustomers(req, res) {
  const customer = await CustomerModel.find().exec();
  res.json(customer);
}

async function getCustomer(req, res) {
  const { id: customerId } = req.params;
  const customer = await CustomerModel.findById(customerId)
    .populate("users", "_id firstName lastName")
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
    // address,
    customerId,
    // ContactNo,
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

async function updateCustomer(req, res) {
  const { id: customerId } = req.params;
  const { ContactNo, address } = req.body;
  const customer = await CustomerModel.findByIdAndUpdate(
    customerId,
    { ContactNo, address },
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
    .select(" ContactNo address customers")
    .exec();
  console.log(order);
  if (!customer || !order) {
    return res.status(404).json("customer or Customer Not Found");
  }
  customer.orders.addToSet(order._id);
  order.customers.addToSet(customer._id);
  await customer.save();
  await order.save();
  console.log("customer sent a order ");
  return res.json(customer);
}
module.exports = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  addOrderForCustomers,
};
