const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const UserSchema = Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    createdDate : {
        type : Number,
        default : 0
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;