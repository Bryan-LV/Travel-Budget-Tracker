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

// get single country
router.post('/country', async (req,res) => {
  console.log(req.body);
    if(req.body.id){
      try {
        let country = await Country.findById(req.body.id);
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
      country: req.body.country
    })
    await country.save();
    res.json({msg: 'Country has been added'});

  } catch (error) {
    res.status(400).json({error});
  }
  
})

// delete item in country
router.delete('/', async (req,res) => {
  try {
    // find item by id delete item
    await Country.findOneAndDelete({_id: req.body.id});
    res.json({msg: 'Country has been deleted'});

  } catch (error) {
    res.status(400).json({error});
  }
})

// edit country name
router.put('/', async (req,res) => {
  const {country, id} = req.body;
  const updatedObj = {};
  try {
    // create updated object
    if(country) updatedObj.country = country;
    // find country and update
    await Country.findByIdAndUpdate(id,{$set: updatedObj});
    res.json({msg: 'Country has been updated'});
    
  } catch (error) {
    res.status(400).json({error});
  }
})

module.exports = router;