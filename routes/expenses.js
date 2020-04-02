const express = require('express');
const Country = require('../models/countries');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const axios = require('axios');

// get all expenses from category
router.post('/country',[
  check('countryID', 'Please enter country ID').not().isEmpty(),
  check('categoryID', 'Please enter categoryID').not().isEmpty(),
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  const {countryID, categoryID} = req.body;
  const stringifyCategoryID = JSON.stringify(categoryID);

   try {
    // find country
    let country = await Country.findById(countryID);
    if(!country) {
      return res.status(400).json({error:'No country found'});
    }

    // find category
    let categories = country.categories;
    let expenses = []
    for(let i = 0; i < categories.length; i++ ){
      let categories_id = JSON.stringify(categories[i]._id);
      if(categories_id === stringifyCategoryID){
        expenses.push(...categories[i].expenses);
      }
    }
    res.json({msg: expenses});
    
  } catch (error) {
    return res.status(400).json({error:'No expenses found'});
  }
})

// get single expense from category
router.post('/country/expense',[
  check('countryID', 'Please enter country ID').not().isEmpty(),
  check('categoryID', 'Please enter categoryID').not().isEmpty(),
  check('expenseID', 'Please enter expenseID').not().isEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  const {countryID, categoryID, expenseID} = req.body;

  const stringifyCategoryID = JSON.stringify(categoryID);
  const stringifyExpenseID = JSON.stringify(expenseID)

   try {
    // find country
    let country = await Country.findById(countryID);
    if(!country) {
      return res.status(400).json({error:'No country found'});
    }

    // find category
    let category = country.categories.filter(category => JSON.stringify(category._id) === stringifyCategoryID);
    let [singleExpense] = category;
    let expense = singleExpense.expenses.filter(expense => JSON.stringify(expense._id) === stringifyExpenseID);

    res.json({msg: expense});

  } catch (error) {
    return res.status(400).json({error:'No expense found'});
  }
})


// add expense item to category
router.post('/country/add', [
  check('countryID', 'Please enter country ID').not().isEmpty(),
  check('categoryID', 'Please enter categoryID').not().isEmpty(),
  check('expenseName', 'Please enter expense name').not().isEmpty(),
  check('expensePrice', 'Please enter expense price').not().isEmpty(),
  check('baseCurrency', 'Please enter base currency').not().isEmpty(),
  check('foreignCurrency', 'Please enter foreign currency').not().isEmpty(),
],async (req,res) => {
  const errors = validationResult(req);
  if(!errors) {
    return res.status(400).json({errors: errors.array()});
  }

  const { 
    countryID,
    categoryID, 
    expenseName, 
    expensePrice, 
    baseCurrency, 
    foreignCurrency,
    methodOfPayment,
    category,
    spread,
    notes,
    photo,
    date} = req.body;

  const stringifyCategoryID = JSON.stringify(categoryID);

  
  try {
    const getCurrencyExchange = await axios(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${baseCurrency},${foreignCurrency}`);
    const foreignCurrencyRate = getCurrencyExchange.data.rates[foreignCurrency];

    const conversion = expensePrice / foreignCurrencyRate;

    const expenseObj = {
      name: expenseName,
      price: conversion.toFixed(2),
      foreignPrice: expensePrice,
      category: category
    }

    if(methodOfPayment) expenseObj.methodOfPayment = methodOfPayment;
    if(spread) expenseObj.spread = spread;
    if(notes) expenseObj.notes = notes;
    if(photo) expenseObj.photo = photo;
    if(date) expenseObj.date = date

    // find country
    let country = await Country.findById(countryID);
    if(!country) {
      return res.status(400).json({error:'No country found'});
    }

    // find category inside country
    const categories = country.categories;
  
    for(let i = 0; i < categories.length; i++){
      let category_id = JSON.stringify(categories[i]._id);
      if(stringifyCategoryID === category_id){
        categories[i].expenses.push(expenseObj);
      }
    }

    await country.save()
    res.json({msg: country});

  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
})


// edit item in expense
router.put('/country/edit',[
  check('countryID', 'Please enter country ID').not().isEmpty(),
  check('categoryID', 'Please enter categoryID').not().isEmpty(),
  check('expenseID', 'Please enter expenseID').not().isEmpty()
], async (req,res) => {
  
  const { 
    countryID,
    categoryID,
    expenseID, 
    expenseName, 
    expensePrice, 
    baseCurrency, 
    foreignCurrency,
    methodOfPayment,
    spread,
    notes,
    date} = req.body;
    
    try {
      
      // find country
      let country = await Country.findById(countryID);
      if(!country){
        return res.status(400).json({errors: errors.array()});
      }
      
      // find category
      let category = country.categories.id(categoryID);
      let expense = category.expenses.id(expenseID);

      // updates
      if(expenseName) expense.name = expenseName;
      if(methodOfPayment) expense.methodOfPayment = methodOfPayment;
      if(spread) expense.spread = spread;
      if(notes) expense.notes = notes;
      if(date) expense.date = date;
      if(req.body.category) expense.category = req.body.category;

      if(expensePrice) {
        const getCurrencyExchange = await axios(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${baseCurrency},${foreignCurrency}`);
        const foreignCurrencyRate = getCurrencyExchange.data.rates[foreignCurrency];

        const conversion = expensePrice / foreignCurrencyRate;
        expense.price = conversion.toFixed(2);
      }
      
      await country.save();
      
      res.json({msg: country});
      
    } catch (error) {
      console.log(error);
      res.status(400).json({error});
    }
  })


  // delete item in expense
  router.delete('/', [ 
    check('countryID', 'Please enter country ID').not().isEmpty(),
    check('categoryID', 'Please enter categoryID').not().isEmpty(),
    check('expenseID', 'Please enter expenseID').not().isEmpty()
  ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors) {
      return res.status(400).json({errors: errors.array()});
    }
  
    const {countryID, categoryID, expenseID} = req.body;
  
    try {
      let country = await Country.findById(countryID);
      if(!country) {
        return res.status(400).json({error:'No country found'});
      }
  
      let category = country.categories.id(categoryID);
      await category.expenses.id(expenseID).remove();
      await country.save()
  
      res.json({msg: country});
  
    } catch (error) {
      res.status(400).json({error});
    }
  
  })

module.exports = router;