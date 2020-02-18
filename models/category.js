const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
  name: {type: String, required:true},
  country: {type: Schema.Types.ObjectId, required: true}
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;