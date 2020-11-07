const Order = require("../models/order");
const ServiceModel = require("../models/service");
const { addOrderForTradie } = require("./tradies");
const { addOrderForCustomers } = require("./customers");

// const { addOrderForTradie } = require("../controllers/")

async function addOrder(req, res) {

    const { 
        serviceTime, 
        address, 
        contactNo, 
        email, 
        name, 
        totalPrice,
        message,
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
        name, 
        totalPrice,
        message,
        serviceId, 
        clientId, 
        tradiesId
    });
    console.log("order" + order);

    try {
        await order.save();
        await addOrderForTradie({
          params: {
            id: tradiesId,
            code: order._id
          }
        }, res);
        await addOrderForCustomers({
          params: {
            id: clientId,
            code: order._id
          }
        }, res);
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
  if (!order || order.deleted) {
    return res.status(404).json("The order is not found");
  }

  return res.json(order);
}

async function getAllOrder(req, res) {
  const orders = await Order.find({deleted: false}).exec();
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

async function addReviews(req, res) {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const order = await Order.findByIdAndUpdate(id, {
    rating,
    comment,
  });

  if (order.rating) {
    return res.status(406).json("The comment already has been reviewed");
  }

  await order.save();
  return res.json("Successfully reviewed");
}

async function getOrdersByTradies(req, res) {
  const { id } = req.params;
  const orders = await Order.find({tradiesId: id});
  return res.json(orders);
}

async function linkOrderToService(req, res) {
  // service id , job id get ,
  const { id, code } = req.params;
  const order = await Order.findById(id)
    .select("services ")
    .exec();
  const service = await ServiceModel.findById(code)
    .select("orders")
    .exec();
  if (!order || !service) {
    return res.status(404).json("Order or Service Not Found");
  }
  if (order.services.length == 0) {
    order.services.addToSet(service._id);
    service.orders.addToSet(order._id);
    await order.save();
    await service.save();
    console.log("link successful beteween order and service");
    return res.json(order);
  } 
  else {
    const copyItem = order.services.slice();
    // console.log(copyItem); //[1]
    const orderServicesExistedItem = copyItem[0];
    // console.log(jobServicesExistedItem); //1   == service._id
    const preService = await ServiceModel.findById(orderServicesExistedItem)
      .select("orders")
      .exec();
    // console.log(preService);
    // console.log(preService.jobs); //找到之前关联的service信息
    // console.log(job._id);
    preService.orders.pull(order._id); //取消之前service的关联
    await preService.save();
    order.services.pop();
    order.services.addToSet(service._id);
    service.orders.addToSet(order._id);
    await order.save();
    await service.save();
    console.log("Update Link");
    return res.json(order);
  }
}


module.exports = {
  addOrder,
  getOrder,
  getAllOrder,
  completeOrder,
  deleteOrder,
  addReviews,
  getOrdersByTradies,
  linkOrderToService,
};