const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = Schema({
  country: {type:String, required: true},
  categories:[{ name: {type:String, required: true}, expenses: [] }]
})

const Countries = mongoose.model('Countries', countries)
module.exports = Countries;