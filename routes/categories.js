const express = require('express');
const Country = require('../models/countries');
const {check, validationResult} = require('express-validator');
const router = express.Router();

// @Route Endpoint
// /api/categories

// fetch categories
router.post('/country', [
  check('countryID', 'please enter a country id').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    // find country
    let country = await Country.findById(req.body.countryID);
    if(!country){
      return res.status(400).json({error:'No categories found'});
    }
    // map through country categories
    const categories = country.categories.map(category => category);
    res.json(categories);
    
  } catch (error) {
    res.status(400).json({error});
  }
})

// add category to country
router.post('/', [
  check('categoryName', 'please enter a name').not().isEmpty(),
  check('countryID', 'please enter a country id').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const category = {
      category: req.body.categoryName
    }
    let country = await Country.findOneAndUpdate({_id: req.body.countryID}, { $push: {categories: category}});
    await country.save();
    res.json({msg: 'Category has been saved'});

  } catch (error) {
    res.status(400).json({error});
  }
  
})

// delete category
router.delete('/',[
  check('countryID', 'please enter a country id').not().isEmpty(),
  check('categoryID','please enter category ID').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    // find item by id delete item
    let country = await Country.findById(req.body.countryID);
    country.categories.id(req.body.categoryID).remove();
    await country.save()
    res.json({msg: 'Category has been deleted'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// edit category
router.put('/', async (req,res) => {
  const {categoryName, categoryID, countryID} = req.body;
  const updatedObj = {};
  try {
    // create updated object
    if(categoryName) {updatedObj.categoryName = categoryName;}

    // find item and update
    let country = await Country.findById(countryID);
    if(!country){
      return res.status(400).json({error:'Category not found'});
    }

    let category = country.categories.id(categoryID);
    category.category = categoryName;
    await country.save()
    res.json({msg: 'Category has been updated'});
    
  } catch (error) {
    console.log(error);
    res.status(400).json({error: 'something went worng'});
  }
})


module.exports = router;