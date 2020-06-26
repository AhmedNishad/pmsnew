var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    name: String,
    email: String,
    course: String,
    type: String,
    date: String
});

module.exports = mongoose.model('Reservation', reservationSchema)