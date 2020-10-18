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
