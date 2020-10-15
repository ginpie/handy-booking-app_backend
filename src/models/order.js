const mongoose = require('mongoose');
const Joi = require('joi');

const schema = mongoose.Schema(
    {
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
            validate: {
                validator: (contactNo) => !Joi.string().length(10).regex(/^[0-9]+$/).validate(contactNo).error,
                msg: "Invalid phone number"
            }
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator:(email) => !Joi.string().email().validate(email).error,
                msg: "Invalid email format"
            }
        },
        name: {
            type: String,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            // ref: "Message",
            required: true,
        },
        complete: {
            type: Boolean,
            required: true,
            default: false,
        },
        service: {
            type: String,
            ref: 'Service',
        },
        customers: { type: [{ type: String, ref: "Customer" }], select: false },
        tradies: { type: [{ type: String, ref: "Tradie" }], select: false },
        deleted: {
            type: Boolean,
            default: false,
        },
    }
);

  
const Model = mongoose.model("Order", schema);

module.exports = Model;
