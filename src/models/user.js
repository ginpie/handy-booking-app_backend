const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        return !Joi.string().email().validate(email).error;
      },
      msg: "Invalide Format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => {
        return !Joi.string().validate(password).error;
      },
      msg: "Invalide Format",
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    select: false,
  },
  customers: {
    type: [{
      type: String,
      ref: "Customer"
    }],
    select: false
  },
  tradies: {
    type: [{
      type: String,
      ref: "Tradie"
    }],
    select: false
  },
});

schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
schema.methods.validatePassword = async function (password) {
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
};

const Model = mongoose.model("User", schema);

module.exports = Model;