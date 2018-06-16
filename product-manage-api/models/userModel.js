var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserModel = new Schema({
    name: { type: String, required:true },
    email: { type: String, required:true, unique:true },
    cpf: { type: String, required:true, unique:true },
    password: { type: String, required:true },
    type: { type: Number, min:0, max:1 },
    birthday: { type: Date, required:true}
});
module.exports = mongoose.model('users', UserModel)
