/**
 * Created by peresthahadji on 10.06.17.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our lesson schema
var Lesson   = new mongoose.Schema({
    //delete vvvvv
    title: String,
    synopsis: String,
    mpaa_rating: String,
    year: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //^^^^^delete
    frequency: String,
    start_time: String,
    end_time: String,
    start_day: Date,
    instrument_list: [String]
});


// Export the Mongoose model
module.exports = mongoose.model('Lesson', Lesson);