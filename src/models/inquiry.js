const mongoose = require("mongoose");

const schema = mongoose.Schema({

  createTime: {
    type: Date,
    required: true,
  },

  address: {
    address1: {
      type: String,
      required: true,
    },
    address2: {
    type: String,
    },
    suburb: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  }

  serviceTime: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  // inquiry information
  message: {
    type: String,
    // ref: "Message",
    required: true,
  },
  serviceId: {
    type: String,
    ref: "Service",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.String,
    refer: "Customer",
    required: true,
  },
  tradiesId: {
    type: mongoose.Schema.Types.String,
    refer: "Tradie",
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Model = mongoose.model("Inquiry", schema);

module.exports = Model;