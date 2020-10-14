const mongoose = require("mongoose");

const schema = mongoose.Schema({
 
  createTime: {
    type: Date,
    required: true,
  },

  // Client information
  zipCode: {
    type: Number,
    required: true,
  },
  jobDateTime: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: false,
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

  // inquiry information
  message: {
    type: String,
    ref: "Message",
    required: true,
  },
  service: {
    type: String,
    ref: "Service",
  },
  clientId: {
    type: mongoose.Schema.Types.String,
    refer: "Customer",
  },
  tradiesID: {
    type: mongoose.Schema.Types.String,
    refer: "Tradie",
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Inquiry", schema);

module.exports = Model;
