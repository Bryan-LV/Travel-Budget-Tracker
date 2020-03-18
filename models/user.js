const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
  name: {type:String, required: true},
  email: {type:String, required:true},
  password: {type:String, required:true},
  countries: [{type: Schema.Types.ObjectId, ref: 'countries'}],
  date: {type: Date, default: new Date()}
})

const User = mongoose.model('User', user)
module.exports = User;