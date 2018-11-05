var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});


UserSchema.methods.validatePassword = function(passw, callback){

    passw == this.password ? callback(false, true) : callback(true, false);
    
}


module.exports = mongoose.model('User',UserSchema);