const mongoose = require("mongoose");
//To DO service 返回所有jobname，jobid,,

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      uppercase: true,
      alias: "code",
    },

    serviceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    __v: { type: Number, select: false },
    createdAt: { type: Date, select: false },
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

const Model = mongoose.model("Service", schema);

module.exports = Model;
