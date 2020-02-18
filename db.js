const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB () {
  try {
    mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
    console.log('db has connected');    
  } catch (error) {
    console.log('db could not connect');
  }
}

module.exports = connectDB;