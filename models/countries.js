const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = Schema({
  name: {type:String, required: true},
  user: {type:Schema.Types.ObjectId, ref: 'user'},
  baseCurrency: {type:String, required: true},
  budget: {type:Number, required: true},
  photo: {type:String },
  startDate: {type:Date, required: true},
  endDate: {type:Date},
  date: {type: Date, default: new Date()},
  categories:[
    {
      category: {type:String},
      expenses: [{
        name: { type:String },
        price: { type: Number },
        foreignPrice: {type: Number},
        date: {type: Date, default: new Date()},
        methodOfPayment: {type:String},
        category:{type:String},
        spread:{type:Number},
        notes:{type:String}
      }
      ]
    }
  ]
})

const Countries = mongoose.model('Countries', countries)
module.exports = Countries;