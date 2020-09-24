const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: true,
  },
  firstName: {
    type: String,
    default: "firstName ",
  },
  lastName: {
    type: String,
    default: "lastName ",
  },
  avatar: {
    type: String,
    default: "avatar ",
  },
  createdAt: {
    type: Date,
    select: false,
  },
  customers: { type: [{ type: String, ref: "Customer" }], select: false },
  tradies: { type: [{ type: String, ref: "Tradie" }], select: false },
});

const Model = mongoose.model("User", schema);

module.exports = Model;
