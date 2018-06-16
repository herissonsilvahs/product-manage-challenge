var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductModel = new Schema({
    name: { type: String, required:true},
    price: { type: Number, required:true},
    description: { type: String, required:true},
    duedate: { type: Date, required:true}
});
module.exports = mongoose.model('products', ProductModel);
