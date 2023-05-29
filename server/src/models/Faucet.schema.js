const mongoose = require('mongoose');
const { Schema } = mongoose;
const { NETWORK } = require('../constants');

const OrderSchema = new Schema({
    account: { type: String, required: true, indexed: true },
    amount: { type: Number, required: true },
    network: { type: String, enum: NETWORK, required: true },
    txHash: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);