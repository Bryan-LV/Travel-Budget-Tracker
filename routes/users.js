const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Country = require('../models/countries');
const config = process.env.JWT_SECRET;
const authToken = require('../middleware/authToken');

// =Route /api/user/create
// =Desc Create a user
router.post('/create',[
  check('name','Please enter name').not().isEmpty(),
  check('email','Please enter email').isEmail(),
  check('password','Password must be 6 characters').isLength({min:6})
] , async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log('validation error');
    return res.status(400).json({error: errors.array()});
  }

  const {name, email, password} = req.body;

  try {
    // check if user doesn't already exists
    let user = await User.findOne({email: email});
    if(user){
      return res.status(400).json({error: 'User already exists'});
    }

    // create user and hash their password
    user = new User({name, email, password});
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    
    // save to db
    await user.save();

    // create jwt
    const payload = {
      userID: user.id
    }

    jwt.sign(payload, config, (error, token) => {
      if(error){
        console.log('jwt error');
        throw error;
      }

      res.json(token);
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({error: error});
  }
})

// =Route /api/user/login
// =Desc Login a user
router.post('/login', [
  check('email','Please enter valid email').isEmail(),
  check('password','Please enter valid password').isLength({min:6})
], async (req,res) => {
  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error: errors.array()});
  }

  const {email, password} = req.body;

  try {
    // check if user email exists
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: 'User not found'});
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
      return res.status(400).json({error: 'Password does not match what we have on record'});
    }

    // create jwt
    const payload = {
      userID: user.id
    }

    jwt.sign(payload, config, (error,token) => {
      if(error){
        throw error;
      }
      res.json(token);
    })
  } catch (error) {
    res.status(400).json({error: error});
  }
})

// =Route /api/user
// =Desc Get the logged in user
router.get('/', authToken, async (req,res) => {
  try {
    // find user with authToken
    let user = await User.findById(req.userID);
    if(!user){
      return res.status(400).json({error: 'User cannot be found'});
    }
    res.json(user);

  } catch (error) {
    res.status(400).json({error: 'Having a problem loading your profile 😅'});
  }
})

// =Route /api/user
// =Desc Delete a user
router.delete('/', authToken, async (req,res) => {
  try {
    // find user with authToken
    let user = await User.findById(req.userID);
    if(!user){
      return res.status(400).json({error: 'User cannot be found'});
    }

    // check if user owns profile
    if(req.userID !== user.id.toString()){
      return res.status(400).json({error: 'User is not authenticated to delete this account'});
    }

    await Country.deleteMany({user: req.userID});
    await user.remove();
    res.json({ msg: 'User has been deleted'})

  } catch (error) {
    res.status(400).json({error: error});
  }
})

// =Route /api/user/profile
// =Desc Update a user profile
router.put('/profile', authToken, async (req,res) => {
    const updateObj = {};
    if(req.body.name) updateObj.name = req.body.name;
    if(req.body.email) updateObj.email = req.body.email;

    try {
      // find user 
      let user = await User.findById(req.userID);
      if(!user){
        return res.status(400).json({error: 'User cannot be found'});
      }
      // update user 
      user = await User.findByIdAndUpdate(req.userID,{ $set: updateObj});
      res.json({msg: 'User has been updated'});

    } catch (error) {
      res.status(400).json({error: error});
    }

})

// =Route /api/user/password
// =Desc Update a user password
router.put('/password', authToken, async (req,res) => {
  const {password, newPassword} = req.body;

  try {
    // find user 
    let user = await User.findById(req.userID);
    if(!user){
      return res.status(400).json({error: 'User cannot be found'});
    }
    
    // check password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
      return res.status(400).json({error: 'Password does not match what we have on record'});
    }

    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update user 
    user = await User.findByIdAndUpdate(req.userID,{ $set: {password: hashedPassword}});
    res.json(user);

  } catch (error) {
    res.status(400).json({error: error});
  }
})

// =Route /api/user/all
// =Desc Get all users
router.get('/all', async (req,res) => {
  try {
    let users = await User.find();
    if(users.length === 0){
      return res.status(400).json({error: 'No users found'});
    }

    res.json(users);

  } catch (error) {
    res.status(400).json({error: error});
  }
})


module.exports = router;