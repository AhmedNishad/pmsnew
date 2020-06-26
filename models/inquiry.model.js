var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inquirySchema = new Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    query: String,
    placedOn: Date
});

module.exports = mongoose.model('Inquiry', inquirySchema)