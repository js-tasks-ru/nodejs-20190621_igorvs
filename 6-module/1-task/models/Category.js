const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
   // required: "Укажите подкатегорию",
    required: true,
    unique: true,
  },
});


//const SubCat = mongoose.model("SubCat", subCategorySchema);

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    //required: "Укажите категорию",
    required: true,
    unique: true,
  },
  subcategories: [subCategorySchema]
  /*subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCat",
  }]*/
});

module.exports = connection.model('Category', categorySchema);
