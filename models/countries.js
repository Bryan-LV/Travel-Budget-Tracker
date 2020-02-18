const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = Schema({
  country: {type:String, required: true},
  totalBalance: {type:Number, default:0}
})

const Countries = mongoose.model('Countries', countries)
module.exports = Countries;