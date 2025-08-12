const mongoose = require('mongoose');
const MenuItem = require('./MenuItem');

const orderItemSchema = new mongoose.Schema({
    MenuItem:{type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true},
    quantity:{type: Number, required: true, min: 1},
    notes:{type: String, maxlength: 500}
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
