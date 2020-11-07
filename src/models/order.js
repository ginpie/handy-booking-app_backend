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
            // required: true,
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
        },
        contactNo: {
            type: String,
            required: true,
            // validate: {
            //     validator: (contactNo) => !Joi.string().length(10).regex(/^[0-9]+$/).validate(contactNo).error,
            //     msg: "Invalid phone number"
            // }
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
        },
        complete: {
            type: Boolean,
            required: true,
            default: false,
        },
        services: { type: [{ type: String, ref: "Service" }], select: false },
        customers: { type: [{ type: String, ref: "Customer", }], select: false },
        tradies: { type: [{ type: String, ref: "Tradie", }], select: false },
        deleted: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            validate: {
                validator:(rating) => !Joi.number().min(0).max(5).validate(rating).error,
                msg: "Please input rating between 0 and 5.",
            }
        },
        comment: {
            type: String,
        }
    }
);

const Model = mongoose.model("Order", schema);

module.exports = Model;
