const mongoose = require('mongoose');
const Table = require('./Table');

const customerOrderSchema =  new mongoose.Schema({
    Table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    placedTime: { type: Date, default: Date.now },
    totalPrice: { type: Number },
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
    
});

customerOrderSchema.pre('save', async function(next) {
    try {
        if (this.isNew || this.isModified('items')) {
            const items = await mongoose.model('OrderItem').find({ _id: { $in: this.items } });
            this.totalPrice = items.reduce((total, item) => total + item.price, 0);
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('CustomerOrder', customerOrderSchema);
