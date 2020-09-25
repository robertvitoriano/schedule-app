const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Scheama({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const User = mongoose.model('user',UserSchema);

module.exports = User;