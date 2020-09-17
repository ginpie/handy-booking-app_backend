const mongoose = require('mongoose');

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
        totalPrice: {
            type: Number,
            required: true,
        },
        complete: {
            type: Boolean,
            required: true,
            default: false,
        },
        rating: {
            type: Number,
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
    }
);

const Model = mongoose.model('Order', schema);

module.exports = Model;