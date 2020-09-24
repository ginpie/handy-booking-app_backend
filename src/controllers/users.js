const UserModel = require("../models/user");
const CustomerModel = require("../models/customer");
const TradieModel = require("../models/tradie");
async function getAllUsers(req, res) {
  const user = await UserModel.find().exec();
  res.json(user);
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findById(id)
    .populate("customers")
    .populate("tradies")
    .exec();
  if (!user) {
    return res.status(404).json("user Not Found");
  }
  return res.json(user);
}

async function addUser(req, res) {
  const { email, firstName, lastName } = req.body;
  const user = new UserModel({
    email,
    firstName,
    lastName,
  });
  await user.save();
  return res.status(201).json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json("user not found");
  }

  await CustomerModel.updateMany(
    { users: user._id },
    { $pull: { users: user._id } }
  ).exec();
  await TradieModel.updateMany(
    { users: user._id },
    { $pull: { users: user._id } }
  ).exec();
  return res.sendStatus(200);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { email, firstName, lastName } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { email, firstName, lastName },
    { new: true }
  ).exec();

  if (!user) {
    return res.status(404).json("user Not Found");
  }
  await user.save();
  return res.json(user);
}

async function addUserTOCustomers(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id customers").exec();
  const customer = await CustomerModel.findById(code)
    .select("customerId ContactNo address users")
    .exec();
  if (!user || !customer) {
    return res.status(404).json("User or Customer Not Found");
  }

  if (user.customers.length == 0) {
    user.customers.addToSet(customer._id);
    customer.users.addToSet(user._id);
    await user.save();
    await customer.save();
    console.log("This user is a customer");
    return res.json(user);
  } else {
    const copyItem = user.customers.slice();
    const userCustomerExistedItem = copyItem[0];
    const preCustomer = await CustomerModel.findById(userCustomerExistedItem)
      .select("users")
      .exec();

    preCustomer.users.pull(user._id);
    await preCustomer.save();
    user.customers.pop();
    user.customers.addToSet(customer._id);
    customer.users.addToSet(user._id);
    await user.save();
    await customer.save();
    console.log("Update Link");
    return res.json(user);
  }
}
async function addUserTOTradies(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id tradies ").exec();
  const tradie = await TradieModel.findById(code)
    .select("tradieId users workTime")
    .exec();
  if (!user || !tradie) {
    return res.status(404).json("User or tradie Not Found");
  }
  if (user.tradies.length == 0) {
    user.tradies.addToSet(tradie._id);

    tradie.users.addToSet(user._id);
    await user.save();
    await tradie.save();
    console.log("This user is a tradie");
    return res.json(user);
  } else {
    const copyItem = user.tradies.slice();

    const userTradieExistedItem = copyItem[0];
    const preTradie = await TradieModel.findById(userTradieExistedItem)
      .select("users")
      .exec();
    preTradie.users.pull(user._id);
    await preTradie.save();
    user.tradies.pop();
    user.tradies.addToSet(tradie._id);
    tradie.users.addToSet(user._id);
    await user.save();
    await tradie.save();
    console.log("Update Link");
    return res.json(user);
  }
}

async function notCustomer(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id customers").exec();
  const customer = await CustomerModel.findById(code)
    .select("customerId ContactNo address users")
    .exec();
  if (!user || !customer) {
    return res.status(404).json("User or Customer Not Found");
  }

  const oldLength = user.customers.length;
  user.customers.pull(customer._id);
  if (user.customers.length === oldLength) {
    return res.status(404).json("Does not exist");
  }
  customer.users.pull(user._id);
  await user.save();
  await customer.save();

  return res.json(user);
}
async function notTradie(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id tradies ").exec();
  const tradie = await TradieModel.findById(code)
    .select("tradieId users workTime")
    .exec();
  if (!user || !tradie) {
    return res.status(404).json("User or tradie Not Found");
  }
  const oldLength = user.tradies.length;
  user.tradies.pull(tradie._id);
  if (user.tradies.length === oldLength) {
    return res.status(404).json("Does not exist");
  }
  tradie.users.pull(user._id);
  await user.save();
  await tradie.save();

  return res.json(user);
}
module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  addUserTOCustomers,
  addUserTOTradies,
  notCustomer,
  notTradie,
};
