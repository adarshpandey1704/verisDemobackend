const mongoose = require('mongoose');
const { stringify } = require('uuid');
const uniqueValidator = require('mongoose-unique-validator');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String , required: true, minlength: 8 },
    role: {type:String, required:true },
    likedSongs: [{type:String}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);