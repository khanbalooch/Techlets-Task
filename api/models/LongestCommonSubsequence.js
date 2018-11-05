var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LongestCommonSubsequenceSchema = new Schema({
    lcs:{
        type: String
    },
    string1:{
        type: String,
        required: true
    },
    string2:{
        type: String,
        required: true
    },
    user:{
        type: String,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('LCS', LongestCommonSubsequenceSchema);
