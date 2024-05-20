const mongoose = require('mongoose');
const { stringify } = require('uuid');
const uniqueValidator = require('mongoose-unique-validator');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    eventName: {type:String, required:true},
    eventDate: {type:String, required:true},
    eventTime: {type:String, required:true},
    eventDuration: {type:String, required:true},
    eventLocation: {type:String, required:true},
    eventguest: {type:String, required:true},
    eventNotification: {type:String, required:true},
    eventReminder: {type:String, required:true},
    eventUpload: {type:String, required:true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);