const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = Schema({
  name: {type:String, required: true},
  categories:[
    {
      category: {type:String},
      expenses: [{
        name: { type:String },
        price: { type: Number }
      }]
    }
  ]
})

const Countries = mongoose.model('Countries', countries)
module.exports = Countries;