const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //required: "Укажите наименование",
        unique: true,
    },
    description: {
        type: String,
        required: true,
        //required: "Укажите описание",
    },
    price: {
        type: Number,
        required: true,
        //required: "Укажите цену",
    },
    category: [{
        //type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Types.ObjectId,
        ref: "Category",
        //required: true,
    }],
    subcategory: [{
        //type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Types.ObjectId,
        ref: "SubCat",
        //required: true,
      }],
    images: [String],
       

});

module.exports = connection.model('Product', productSchema);
