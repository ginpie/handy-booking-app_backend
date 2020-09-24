const mongoose = require("mongoose");

const schema = mongoose.Schema({
  createTime: {
    type: Date,
    required: true,
  },
  serviceTime: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
  service: {
    type: String,
    ref: "Service",
  },
  customers: { type: [{ type: String, ref: "Customer" }], select: false },
  tradies: { type: [{ type: String, ref: "Tradie" }], select: false },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Order", schema);

module.exports = Model;
