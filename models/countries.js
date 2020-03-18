const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = Schema({
  name: {type:String, required: true},
  user: {type:Schema.Types.ObjectId, ref: 'user'},
  baseCurrency: {type:String, required: true},
  budget: {type:Number, required: true},
  photo: {type:String },
  startDate: {type:String, required: true},
  endDate: {type:String},
  date: {type: Date, default: new Date()},
  categories:[
    {
      category: {type:String},
      expenses: [{
        name: { type:String },
        price: { type: Number },
        date: {type: Date, default: new Date()}
      }]
    }
  ]
})

const Countries = mongoose.model('Countries', countries)
module.exports = Countries;