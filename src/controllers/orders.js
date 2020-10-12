const Order = require("../models/order");

async function addOrder(req, res) {

    const { 
        serviceTime, 
        address, 
        contactNo, 
        email, 
        firstName, 
        lastName, 
        totalPrice, 
        serviceId, 
        clientId, 
        tradiesId } = req.body;

    const createTime = new Date();
    const order = new Order({
        createTime,
        serviceTime, 
        address, 
        contactNo, 
        email, 
        firstName, 
        lastName, 
        totalPrice, 
        serviceId, 
        clientId, 
        tradiesId
    });

    try {
        await order.save();
    } catch (error) {
        return res.status(400).json(error);
    }
    
    return res.status(201).json(order);

}

async function getOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("customers")
    .populate("tradies")
    .populate("services")
    .exec();
  if (!order) {
    return res.status(404).json("The order is not found");
  }

  return res.json(order);
}

async function getAllOrder(req, res) {
  const orders = await Order.find().exec();
  return res.json(orders);
}

async function completeOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, { complete: true }).exec();
  if (!order) {
    return res.status(404).json("The order is not found");
  }
  if (order.complete) {
    return res.status(406).json("The order is already completed");
  }

  await order.save();
  return res.json(`Order completed`);
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, { deleted: true }).exec();
  if (!order) {
    return res.status(404).json("The order is not found");
  }
  if (order.deleted) {
    return res.status(406).json("The order is already deleted");
  }

  await order.save();
  return res.json("Successfully deleted");
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrder,
  completeOrder,
  deleteOrder,
};
