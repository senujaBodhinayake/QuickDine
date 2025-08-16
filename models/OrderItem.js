const mongoose = require('mongoose');
const MenuItem = require('./MenuItem');

const orderItemSchema = new mongoose.Schema({
    menuItem:{type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true},
    quantity:{type: Number, required: true, min: 1},
    price:{type: Number, min: 0},
    notes:{type: String, maxlength: 500},
});
orderItemSchema.pre('save', async function(next) {
    try {
        const menuItem = await MenuItem.findById(this.MenuItem);
        if (!menuItem) {
            throw new Error('MenuItem not found');
        }
        this.price = menuItem.price * this.quantity;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
