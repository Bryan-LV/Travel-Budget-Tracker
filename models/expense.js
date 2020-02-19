const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = Schema({
  price: {type: Number, required: true},
  name: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, required: true},
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense;