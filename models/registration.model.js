var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registrationSchema = new Schema({
    courseName: String,
    fee: Number,
    name: String,
    address: String,
    email: String,
    mobile: String
});

module.exports = mongoose.model('Registration', registrationSchema)