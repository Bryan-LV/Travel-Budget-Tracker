const express = require('express');
// const Category = require('../models/category');
const Country = require('../models/countries');
const {check, validationResult} = require('express-validator');
const router = express.Router();


// // get all categories
// router.get('/', async (req,res) => {
//   try {
//     let category = await Category.find();
//     res.json(category);
//   } catch (error) {
//     res.status(400).json({error:'No categories found'});
//   }
// })

// add category to country
router.post('/', [
  check('name', 'please enter a name').not().isEmpty(),
  check('country id', 'please enter a country id').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const category = {
      name: req.body.name
    }
    let country = await Country.findOneAndUpdate({_id: req.body.country}, { $set: {categories: category}});
    await country.save();
    res.json({msg: 'Category has been saved'});
  } catch (error) {
    res.status(400).json({error});
  }
  
})

// fetch category
router.post('/country', async (req,res) => {
  try {
    // find category by country ID
    let categories = await Category.find({country: req.body.id});
    if(!categories){
      return res.status(400).json({error:'No categories found'});
    }
    res.json(categories);
    
  } catch (error) {
    res.status(400).json({error});
  }
})

// delete category
router.delete('/', async (req,res) => {
  try {
    // find item by id delete item
    await Category.findOneAndDelete({_id: req.body.id});
    res.json({msg: 'Category has been deleted'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// edit category
router.put('/', async (req,res) => {
  const {name, id} = req.body;
  const updatedObj = {};
  try {
    // create updated object
    if(name) {updatedObj.name = name;}

    // find item and update
    let category = Category.findById(id);
    if(!category){
      return res.status(400).json({error:'Category not found'});
    }
    await Category.findByIdAndUpdate(id,{$set: updatedObj});
    res.json({msg: 'Category has been updated'});
    
  } catch (error) {
    res.status(400).json({error});
  }
})


module.exports = router;