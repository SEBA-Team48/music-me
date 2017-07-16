/**
 * Created by peresthahadji on 10.06.17.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
	fname:{
		type: String,
		required: true /*switch to true later*/
	},
	lname:{
		type: String,
		required: true /*switch to true later*/
	},
	emailadress:{
		type: String,
		required: true /*switch to true later*/
	},
    is_teacher:{
	    type: Boolean,
		required: true /*switch to true later*/
	},
	rating:{
        type: [Number],
        required: false
    },
    comment:{
        type: [String],
        required: false
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed ouser.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', userSchema);

module.exports = User;
