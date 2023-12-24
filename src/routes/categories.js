const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        const categoryList = await Category.find();
        if(!categoryList){
            res.status(404).json({message: 'failed to find categories'})
        }
        categoryList.map((category) => {
            category.value = category.id;
        })
        res.status(200).send(categoryList);
    } catch(err){
        res.status(400).json({ error: err });
    }   
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            res.status(404).json({message: 'category not found' });
        }
        res.status(200).send(category);
    } catch(err){
        res.status(400).json({ error: err });
    }    
});

router.post('/', async(req,res) => {
    try {
        let category = new Category({
            label: req.body.label,
        });
        category = await category.save();
        if(!category){
            res.status(404).send('the category cannot be created');
        }
        res.status(200).send(category);
    } catch(err){
        res.status(400).json({ error: err });
    }   
});

router.put('/:id', async(req,res) => {
    try{
        const category = await Category.findByIdAndUpdate(
            req.params.id, {
                label: req.body.label
            }, 
            { new: true }
        );
        if(!category){
            res.status(404).send('the category cannot be updated');
        }
        res.status(200).send(category);
    } catch(err){
        res.status(400).json({error: err});
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if(category){
            res.status(200).send(category);
        } else {
            res.status(404).json({ success: false, message: 'category not found' });
        }
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

module.exports = router;