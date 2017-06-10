/**
 * Created by peresthahadji on 10.06.17.
 */
// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var Lesson   = new mongoose.Schema({
    name: String,
    synopsis: String,
    rating: String,
    year: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Lesson', Lesson);