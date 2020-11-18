var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    registrationId: String,
    fee: Number,
    placedOn: Date,
    settledOn: Date,
    isSettled: Boolean,
    receiptNumber: String
});

module.exports = mongoose.model('Payment', paymentSchema)