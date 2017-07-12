/**
 * Created by peresthahadji on 10.06.17.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our teacher schema
var Teacher   = new mongoose.Schema({
    teacherName: String,
    age: String,
    instrument_list: [String],
    location: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


// Export the Mongoose model
module.exports = mongoose.model('Teacher', Teacher);