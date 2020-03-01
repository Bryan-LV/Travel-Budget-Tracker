const express = require('express');
const Country = require('../models/countries');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// get all countries
router.get('/', async (req,res) => {
  try {
    let country = await Country.find({});
    res.json(country);
  } catch (error) {
    res.status(400).json({error});
  }
})

// post new country
router.post('/', [
  check('country', 'please enter a country').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    let country = new Country({
      name: req.body.country
    })
    
    await country.save();
    res.json({msg: 'Country has been added'});

  } catch (error) {
    res.status(400).json({error});
  }
  
})

// get single country
router.post('/country', async (req,res) => {
    if(req.body.countryID){
      try {
        let country = await Country.findById(req.body.countryID);
        if(!country){
          return res.status(400).json({error:'No country exists with that name'});
        }
        res.json(country)
      } catch (error) {
        res.status(400).json(error);
      }
    } else{
      res.status(400).json({error: 'There is no country with that name saved'});
    }
})



// delete item in country
router.delete('/country', async (req,res) => {
  try {
    // find item by id delete item
    await Country.findOneAndDelete({_id: req.body.countryID});
    res.json({msg: 'Country has been deleted'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// edit country name
router.put('/country', async (req,res) => {
  const {countryName, countryID} = req.body;
  const updatedObj = {};
  try {
    // update country name if request is there
    if(countryName) updatedObj.name = countryName;
    // find country and update
    await Country.findByIdAndUpdate(countryID,{$set: updatedObj});
    res.json({msg: 'Country has been updated'});
    
  } catch (error) {
    res.status(400).json({error});
  }
})

// add new category to country
router.put('/category', async (req,res) => {
  const {countryId, name} = req.body;
  try {
    let category =  await Country.findByIdAndUpdate(countryId, { $push: {categories: {name}}})
    await category.save();
    res.json({msg: 'Category has been saved to country'});
  } catch (error) {
    res.status(400).json({error});
  }
})


module.exports = router;