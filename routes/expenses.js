const express = require('express');
const Expense = require('../models/expense');
const Country = require('../models/countries');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// get items from expense
router.post('/country', async (req,res) => {
  try {
    let expenses = await Expense.findById(req.body.id);
    if(!expenses) {
      return res.status(400).json({error:'No expenses found'});
    }
    res.json(expenses);
  } catch (error) {
    res.status(400).json({error});
  }
})

// post item to expense
router.post('/', [
  check('price', 'please enter a price').not().isEmpty(),
  check('name', 'please enter a name').not().isEmpty(),
  check('country', 'please enter country').not().isEmpty(),
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    let country = await Country.findById(req.body.country);
    let expense = new Expense({
      name: req.body.name,
      price: req.body.price
    })

    await expense.save();
    console.log(expense);
    res.json({msg: 'Expense has been added'});
  } catch (error) {
    res.status(400).json({error});
  }
  
})

// delete item in expense
router.delete('/', async (req,res) => {
  try {
    // find item by id delete item
    await Expense.findOneAndDelete({_id: req.body.id});
    res.json({msg: 'Expense has been deleted'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// edit item in expense
router.put('/', async (req,res) => {
  const {name, price, category} = req.body;
  const updatedObj = {};
  try {
    // create updated object
    if(name) {updatedObj.name = name;}
    if(price) {updatedObj.price = price;}
    if(category) {updatedObj.category = category;}
    // find item and update
    let expense = Expense.findById(req.body.id);
    if(!expense){
      return res.status(400).json({errors: errors.array()});
    }
    await Expense.findByIdAndUpdate(req.body.id,{$set: updatedObj});
    res.json({msg: 'Expense has been updated'});
    
  } catch (error) {
    res.status(400).json({error});
  }
})

module.exports = router;