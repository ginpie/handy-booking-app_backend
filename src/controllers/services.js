const ServiceModel = require("../models/service");
const JobModel = require("../models/job");
async function addService(req, res) {
  const { code, serviceName, description } = req.body;
  const existService = await ServiceModel.findById(code).exec();
  if (existService) {
    return res.status(409).json("Already Existed");
  }
  const service = new ServiceModel({ code, serviceName, description });
  await service.save();
  return res.status(201).json(service);
}

async function getService(req, res) {
  const { id: code } = req.params;
  const service = await ServiceModel.findById(code)
    .populate("jobs", "jobName visible")
    .exec();
  if (!service) {
    return res.status(404).json("Service Not Found");
  }
  return res.json(service);
}

async function getAllServices(req, res) {
  const services = await ServiceModel.find();
  return res.json(services);
}

async function updateService(req, res) {
  const { id: code } = req.params;
  const { serviceName } = req.body;

  const service = await ServiceModel.findByIdAndUpdate(
    code,
    { serviceName },
    { new: true }
  ).exec();

  if (!service) {
    return res.status(404).json("service Not Found");
  }
  await service.save();
  return res.json(service);
}

async function deleteService(req, res) {
  const { id: code } = req.params;
  const service = await ServiceModel.findByIdAndDelete(code).exec();
  if (!service) {
    return res.status(404).json("service Not Found");
  }

  await JobModel.updateMany(
    { services: service._id },
    {
      $pull: {
        services: service._id,
      },
    }
  ).exec();
  return res.sendStatus(204);
}

module.exports = {
  addService,
  getAllServices,
  getService,
  updateService,
  deleteService,
};
