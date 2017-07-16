/**
 * Created by peresthahadji on 10.06.17.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our lesson schema
var Lesson   = new mongoose.Schema({
    title: String,
    instrument_list: [String],
    start_day: Date,
    start_time: String,
    end_time: String,
    frequency: String,
    is_booked: Boolean,
    userStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});




// Export the Mongoose model
module.exports = mongoose.model('Lesson', Lesson);