
// Load required packages
var mongoose = require('mongoose');

// Define our message schema
var Message   = new mongoose.Schema({
    time: Date,
    subject: String,
    content: String,
    unread: Boolean,
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


// Export the Mongoose model
module.exports = mongoose.model('Message', Message);