const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductModel = new Schema({
    name: { type: String, required:true},
    price: { type: Number, required:true},
    description: { type: String, required:true},
    duedate: { type: Date, required:true}
});
module.exports = mongoose.model('products', ProductModel);
