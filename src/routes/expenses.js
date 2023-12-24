const { Category } = require('../models/category');
const { Expense } = require('../models/expense');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        const expenses = await Expense.find().sort({ 'date': 1 });
        if(!expenses){
            res.status(404).json({ message: 'failed to get expenses' });
        }
        res.status(200).send(expenses);
    } catch(err) {
        res.status(400).json({ error: err });
    }
});

router.get('/:id', async(req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            res.status(404).json({ message: 'expense not found' });
        }
        res.status(200).send(expense);
    } catch(err) {
        res.status(400).json({ error: err });
    }
});

router.get('/getByMonth/:billingMonth', async(req,res) => {
    try {
        const expenses = await Expense.find({ billingMonth: req.params.billingMonth }).sort({ 'date': 1 });
        if(!expenses){
            res.status(404).json({ message: 'failed to get expenses' });
        }
        res.status(200).send(expenses);
    } catch(err) {
        res.status(400).json({ error: err });
    }
});

router.post('/', async(req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if(!category) {
            res.status(404).json({ message: 'invalid category' });
        }
        let expense = new Expense({
            amount: req.body.amount,
            date: req.body.date,
            category: req.body.category,
            billingMonth: req.body.billingMonth,
            notes: req.body.notes,
        })
        expense = await expense.save();
        if(!expense) {
            res.status(404).json({ message: 'failed to add expense'});
        }
        res.status(200).send(expense);
    } catch(err) {
        res.status(400).json({ error: err });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                amount: req.body.amount,
                date: req.body.date,
                category: req.body.category,
                billingMonth: req.body.billingMonth,
                notes: req.body.notes,
            },
            { new: true }
        );
        if(!expense) {
            res.status(404).json({ message: 'failed to update expense '});
        }
        res.status(200).send(expense);
    } catch(err) {
        res.status(400).json({ error: err });
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if(expense){
            res.status(200).send(expense);
        } else {
            res.status(404).json({ success: false, message: 'expense not found' });
        }
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

module.exports = router;