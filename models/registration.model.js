var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registrationSchema = new Schema({
    courseName: String,
    fee: Number,
    name: String,
    address: String,
    email: String,
    mobile: String,
    placedOn: String,
    startDate: String,
    type: String,
    paymentComplete: {type: Boolean, default: false},
    handled: {type: Boolean, default: false}
});

module.exports = mongoose.model('Registration', registrationSchema)