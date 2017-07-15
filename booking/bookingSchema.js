/**
 * Created by peresthahadji on 10.06.17.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our teacher schema
var Booking   = new mongoose.Schema({
    status: boolean,
    userStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }
});


// Export the Mongoose model
module.exports = mongoose.model('Booking', Booking);