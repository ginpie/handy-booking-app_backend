const mongoose = require("mongoose");
//TO DO 和tradie 互相关联
const schema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: "Iam a Job ",
  },
  __v: {
    type: Number,
    select: false,
  },
  createdAt: {
    type: Date,
    select: false,
  },
  services: { type: [{ type: String, ref: "Service" }], select: false },
  tradies: { type: [{ type: String, ref: "Tradie" }], select: false },
});

const Model = mongoose.model("Job", schema);

module.exports = Model;
