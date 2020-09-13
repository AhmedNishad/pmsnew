var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    course: String,
    type: String,
    date: String,
    placedOn: Date
});

module.exports = mongoose.model('Reservation', reservationSchema)