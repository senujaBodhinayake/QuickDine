const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// creating a new table

router.post('/', async (req, res) => {
    try{
        const table= new Table(req.body);
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// to get all tables

router.get('/', async (req, res) => {
    try{
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error fetching tables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// update table status
router.put('/:id',async (req,res)=> {
    try{
        const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
        if (!updated) {
            return res.status(404).json({ message: 'Table not found' });
        }
    } catch (error) {
        console.error('Error updating table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;