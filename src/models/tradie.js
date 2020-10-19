const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      uppercase: true,
      alias: "tradieId",
    },
    //To Do
    workTime: {
      type: String,
      required: true,
      default: "Monday ",
    },
    PostCode: {
      type: String,
      default: "4000 ",
    },
    description: {
      type: String,
      default: "description about what this tradie able to do ",
    },
    users: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      select: false,
    },
    jobs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
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

const Model = mongoose.model("Tradie", schema);

module.exports = Model;
