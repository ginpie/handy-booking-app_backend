const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      uppercase: true,
      alias: "customerId",
    },
    address: {
      type: String,
      required: true,
      default: true,
    },
    ContactNo: {
      type: String,
      default: "firstName ",
    },
    users: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      select: false,
    },
    orders: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
      select: false,
    },
    inquiries: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inquiry" }],
      select: false,
    },
  },
  {
    timestamps: true, // show timestamp
    toJSON: {
      virtuals: true, // required to show 'code' property
    },
    id: false, // hide `id` virtual property
  }
);

const Model = mongoose.model("Customer", schema);

module.exports = Model;
