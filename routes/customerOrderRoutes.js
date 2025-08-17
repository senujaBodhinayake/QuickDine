const express = require('express');
const Table = require('../models/Table');
const router = express.Router();
const CustomerOrder = require('../models/CustomerOrder');


// create
router.post('/', async (req, res) => {
    try {
        const newOrder = new CustomerOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get orders
// router.get('/', async (req, res) => {
//     try {
//         const orders = await CustomerOrder.find({table:req.params.tableId})
//         .populate('items')
//         .populate('table');
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
router.get('/table/:tableId', async (req, res) => {
  try {
    const orders = await CustomerOrder.find({ table: req.params.tableId })
      .populate('items')
      .populate('table');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const order = await CustomerOrder.findById(req.params.id)
            .populate('items')
            .populate('table');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update order status

router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await CustomerOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
