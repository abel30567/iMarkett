// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

        name     : String,
        email        : String,

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// checking email cnfirmation
userSchema.methods.isEmailConfirmed = function() {
    return this.local.emailConfirmed;
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
