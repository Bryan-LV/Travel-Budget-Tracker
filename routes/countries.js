const express = require('express');
const Country = require('../models/countries');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const authToken = require('../middleware/authToken');

// get all users countries
router.get('/', authToken ,async (req,res) => {
  try {
    // map through 
    let country = await Country.find({user:req.userID});
    res.json(country);
  } catch (error) {
    res.status(400).json({error});
  }
})

// post new country
router.post('/', [
  authToken,
  check('name', 'please enter a country').not().isEmpty(),
  check('baseCurrency', 'please enter a base currency').not().isEmpty(),
  check('budget', 'please enter a budget').not().isEmpty(),
  check('startDate', 'please enter a start date').not().isEmpty(),
], async (req,res) => {

  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }
  
  try {
    const countryObj = {
      name: req.body.name,
      user: req.userID,
      baseCurrency:req.body.baseCurrency,
      budget: req.body.budget,
      startDate: req.body.startDate
    };

    if(req.body.endDate) countryObj.endDate = req.body.endDate;

    let country = new Country(countryObj)
    
    await country.save();
    res.json({msg: 'Country has been added'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// get single country
router.post('/country', authToken, async (req,res) => {
    if(req.body.countryID){
      try {
        let country = await Country.findById(req.body.countryID);
        if(!country){
          return res.status(400).json({error:'No country exists with that name'});
        }
        if(country.user !== req.userID){
          return res.status(400).json({error:'This trip does not belong to this user'});
        }
        res.json(country)
      } catch (error) {
        res.status(400).json(error);
      }
    } else{
      res.status(400).json({error: 'There is no country with that name saved'});
    }
})


// delete country
router.delete('/country',authToken, async (req,res) => {
  try {
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