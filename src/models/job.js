const mongoose = require("mongoose");
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
