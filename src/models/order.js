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
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        totalPrice: {
            type: Number,
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
        client: {
            type: mongoose.Schema.Types.ObjectId,
            refer: 'Customer',
        },
        tradies: {
            type: mongoose.Schema.Types.ObjectId,
            refer: 'Tradies',
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    }
);

const Model = mongoose.model('Order', schema);

module.exports = Model;